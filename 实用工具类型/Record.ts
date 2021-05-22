interface PageInfo {
  title: string;
}

type Page = 'home' | 'about' | 'contact';

type Page2 = string

const recFoo: Record<Page, PageInfo> = {
  home: {title: 'a'},
  about: {title: 'a'},
  contact: {title: 'a'},
}

const recFoo2: Record<Page2, PageInfo> = {
  home: {title: 'a'}
}

// 实现
type MyRecord<T extends string | number | symbol , K> = {
  [P in T]: K
}

const recFoo3: MyRecord<Page2, PageInfo> = {
  home: {title: 'a'}
}

