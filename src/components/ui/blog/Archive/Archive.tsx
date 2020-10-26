import React, { useCallback } from 'react';

import { Container, Hero, BlogPlate, SearchForm } from 'components/ui/general';
import { ArchivePost } from 'templates/blog/Archive';
import { useSearchPosts } from 'hooks';
import { Test } from 'consts/searchForm';
import styles from './Archive.module.scss';

interface Props {
  posts: ArchivePost[];
}

const Archive = (props: Props) => {
  const { value, setValue, posts } = useSearchPosts(props.posts);

  const renderFeed = useCallback(() => {
    if (!posts.length) {
      return (
        <li
          className={styles.feedNothing}
          data-test={Test.ARCHIVE_FEED_NOTHING}
        >
          Nothing matches <span>{value}</span>, please try again...
        </li>
      );
    }

    return posts.map(({ node }) => (
      <li
        key={node.id}
        className={styles.feedItem}
        data-test={Test.ARCHIVE_FEED_ITEM}
      >
        <BlogPlate node={node} />
      </li>
    ));
  }, [posts, value]);

  return (
    <div className={styles.root}>
      <main className={styles.main}>
        <Hero
          title="I'm a frontend developer"
          paragraph={`
            Hi, my name is Tobias Lindström. I'm a developer with passion for
            frontend and an eye for design. This website is created to help others
            and educate myself to become a greater instructor.
          `}
          large
          wave={{
            fill: 'primary',
            backgroundColor: 'eta'
          }}
        />
        <section className={styles.search}>
          <Container>
            <div className={styles.searchInput}>
              <SearchForm value={value} setValue={setValue} />
            </div>
          </Container>
        </section>
        <div className={styles.posts}>
          <Container>
            <ul className={styles.feed}>{renderFeed()}</ul>
          </Container>
        </div>
      </main>
    </div>
  );
};

export default Archive;
