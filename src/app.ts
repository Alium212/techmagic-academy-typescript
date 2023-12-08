import { updateObjectInArray } from './updateObjectInArray.js';

interface IPost {
    userId: number,
    id: number,
    title: string,
    body: string
}

type ElementAttributesType = Record<string, string>;

const logError = (targetElem: Object, targetName: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
        try {
            const result = await originalMethod.apply(this, args);
            return result;
        } catch (error) {
            console.error(`Error occurred in ${targetName}:`, error);
        }
    };

    return descriptor;
};

const createHTMLElement = (
    tagName: string,
    attributes: ElementAttributesType = {},
    innerHTML = ''
): HTMLElement => {
    const element = document.createElement(tagName);

    Object.keys(attributes).forEach(attr => {
        element.setAttribute(attr, attributes[attr]);
    });

    if (innerHTML) {
        element.innerHTML = innerHTML;
    }

    return element;
};

class PostManager {
    private static async getPosts(): Promise<IPost[]> {
        const API_URL = 'https://jsonplaceholder.typicode.com/posts';
        const response = await fetch(API_URL);
        const postsData = await response.json();
        const posts: IPost[] = postsData;
        return posts;
    }
    
    static async renderPosts (postsData: IPost[]): Promise<void> {
        const postsContainer = createHTMLElement('div', { id: 'posts-container', class: 'posts-container' });
    
        postsData.forEach(post => {
            const postNode = createHTMLElement('div', { class: 'post' });
            const titleNode = createHTMLElement('h2', {}, post.title);
            const bodyNode = createHTMLElement('p', {}, post.body);

            postNode.append(titleNode, bodyNode);
            postsContainer.appendChild(postNode);
        });

        document.body.appendChild(postsContainer);
    };

    @logError
    static async startApp(): Promise<void> {
        const postsData = await this.getPosts();
        const copiedPostsData = updateObjectInArray(postsData, 'id', 3, { title: 'Changed!', body: 'Text has been changed.' });

        this.renderPosts(copiedPostsData);
    }
}

PostManager.startApp();