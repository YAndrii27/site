import React, { JSX } from 'react';

function BlogPost({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}): JSX.Element {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <a href={url}>Read more</a>
    </div>
  );
}

async function BlogList(): Promise<JSX.Element> {
  const res = await fetch('http://blog-api:5000/api/posts', { cache: 'no-store' });
  const data = await res.json();
  const content = data?.posts?.map((post: any) => (
    <BlogPost
      key={post.id}
      title={post.title}
      description={post.description}
      url={post.url}
    />
  )) || [];

  return (
    <div
      id="blog"
      className="pt-2 flex flex-col w-full lg:w-about h-fit lg:h-exclude-navigation dark:text-gray-25"
    >
      <div className="m-4">{content}</div>
    </div>
  );
}

export default function Blog(): JSX.Element {
  return (
    <div>
      <div className="flex flex-col lg:flex-row">
        <BlogList />
      </div>
    </div>
  );
}
