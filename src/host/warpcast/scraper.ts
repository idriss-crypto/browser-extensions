import {
  ExternalLinksScrapingResult,
  UserScrapingResult,
} from 'shared/scraping';

import { extractUsernameFromPathname, isUserPathname } from './utils';

export class Scraper {
  public static getExternalLinks(): ExternalLinksScrapingResult[] {
    const selector = 'a';
    const externalLinksNodes = [...document.querySelectorAll(selector)];

    return externalLinksNodes
      .map((node) => {
        const { height, top } = node.getBoundingClientRect();
        if (!height) {
          return;
        }

        const link = node.getAttribute('href');

        if (!link) {
          return;
        }

        return {
          node,
          top: top + window.scrollY,
          data: {
            link,
          },
        };
      })
      .filter(Boolean);
  }

  public static getPosts() {
    const selector = '.min-h-screen > .fade-in > div';
    const posts = [...document.querySelectorAll(selector)];

    return posts
      .map((post) => {
        const links = [...post.querySelectorAll('a')];
        const usernameClasslist = [
          'relative',
          'font-semibold',
          'text-default',
          'hover:underline',
        ];
        const usernameLink = links.find((link) => {
          return usernameClasslist.every((className) => {
            return link.classList.contains(className);
          });
        });
        const username = usernameLink?.getAttribute('href')?.replace('/', '');

        if (!username || !usernameLink) {
          return;
        }

        const linkNodeRect = post.getBoundingClientRect();
        if (!linkNodeRect.height) {
          return;
        }

        return {
          node: post,
          usernameLinkNode: usernameLink,
          top: linkNodeRect.top + window.scrollY,
          data: {
            authorUsername: username,
          },
        };
      })
      .filter(Boolean);
  }

  /** Array of aside elements where index 0 is left aside and index 1 is right aside (can get changed if Warpcast modifies their UI) */
  private static getAsides() {
    return [...document.querySelectorAll('aside')];
  }

  private static getRightAside() {
    return Scraper.getAsides()[1];
  }

  private static getRightAsideSections() {
    const rightAside = Scraper.getRightAside();
    if (!rightAside) {
      return [];
    }
    return [...rightAside.querySelectorAll(':scope > div')];
  }

  private static getSuggestedFollowsSection() {
    const sections = Scraper.getRightAsideSections();
    return sections.find((section) => {
      const title = section.querySelector(':scope > div');
      if (!title) {
        return false;
      }
      return title.textContent === 'Suggested Follows';
    });
  }

  private static getSuggestedFollowsSectionUsers(): UserScrapingResult[] {
    const suggestedFollowSection = Scraper.getSuggestedFollowsSection();
    if (!suggestedFollowSection) {
      return [];
    }

    const links = [...suggestedFollowSection.querySelectorAll('a')];
    return links
      .map((link) => {
        const userNode = link.parentElement;
        if (link.textContent === 'Show more' || !userNode) {
          return;
        }
        const userFullNameNode = userNode.querySelector(
          ':scope > div > div > span',
        );
        const username = link.href.split('/').at(-1);

        if (!userFullNameNode?.parentElement || !username) {
          return;
        }

        const rect = userFullNameNode.getBoundingClientRect();

        const node = userFullNameNode.parentElement;
        node.style.setProperty('display', 'flex', 'important');
        node.style.setProperty('align-items', 'center', 'important');

        return {
          node,
          top: rect.top + window.scrollY,
          data: {
            username,
          },
        };
      })
      .filter(Boolean);
  }

  private static getMain() {
    return document.querySelector('main');
  }

  private static getHandleUser(): UserScrapingResult | undefined {
    const pathname = window.location.pathname;
    if (!isUserPathname(pathname)) {
      return;
    }
    const username = extractUsernameFromPathname(pathname);
    const main = Scraper.getMain();
    if (!main || !username) {
      return;
    }
    const allDivsOfMain = [...main.querySelectorAll('div')];
    const usernameNode = allDivsOfMain.find((div) => {
      return div.textContent === `@${username}`;
    });

    // traversing 2 times via parentElement is required when user is following current user as it changes DOM
    const userFullNameNode =
      usernameNode?.parentElement?.firstElementChild?.firstElementChild ??
      usernameNode?.parentElement?.parentElement?.firstElementChild
        ?.firstElementChild;
    if (!userFullNameNode?.parentElement) {
      return;
    }

    const rect = userFullNameNode.getBoundingClientRect();
    const node = userFullNameNode.parentElement;
    node.style.setProperty('display', 'inline-flex', 'important');
    node.style.setProperty('align-items', 'center', 'important');

    return {
      node,
      top: rect.top + window.scrollY,
      data: {
        username,
      },
    };
  }

  public static getUsers(): UserScrapingResult[] {
    const posts = Scraper.getPosts();
    const usersFromPosts = posts
      .map((post) => {
        const rect = post.usernameLinkNode.getBoundingClientRect();
        const node = post.usernameLinkNode.parentElement;
        if (!node) {
          return;
        }

        node.style.setProperty('display', 'inline-flex', 'important');
        node.style.setProperty('align-items', 'center', 'important');

        return {
          node,
          top: rect.top + window.scrollY,
          data: {
            username: post.data.authorUsername,
          },
        };
      })
      .filter(Boolean);

    const usersFromSuggestedFollow = Scraper.getSuggestedFollowsSectionUsers();
    const handleUser = Scraper.getHandleUser();

    if (handleUser) {
      return [...usersFromPosts, ...usersFromSuggestedFollow, handleUser];
    }

    return [...usersFromPosts, ...usersFromSuggestedFollow];
  }
}
