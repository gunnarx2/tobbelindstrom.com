import {
  useCallback,
  useState,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction
} from 'react';

import { ArchivePost } from 'templates/blog/Archive';
import { sessionStorageIsSupported } from 'utils';

export const useSearchPosts = (
  postsCollection: ArchivePost[]
): {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  posts: ArchivePost[];
} => {
  const sessionStorageKey = 'search';
  const isSupported = sessionStorageIsSupported();
  const [value, setValue] = useState(
    isSupported ? sessionStorage.getItem(sessionStorageKey) || '' : ''
  );
  const memoPostsCollection = useMemo(() => postsCollection, [postsCollection]);

  const getPosts = useCallback(
    () =>
      memoPostsCollection.filter(({ node }) => {
        if (!value) return memoPostsCollection;

        const { title, spoiler } = node.frontmatter;
        return [title, spoiler]
          .map(
            (type) =>
              type.toLowerCase().search(value.trim().toLowerCase()) !== -1
          )
          .includes(true);
      }),
    [memoPostsCollection, value]
  );
  const [posts, setPosts] = useState(getPosts);

  useEffect(() => {
    setPosts(getPosts());
  }, [getPosts]);

  useEffect(() => {
    if (isSupported) {
      sessionStorage.setItem(sessionStorageKey, value);
    }
  }, [isSupported, sessionStorageKey, value]);

  return {
    value,
    setValue,
    posts
  };
};
