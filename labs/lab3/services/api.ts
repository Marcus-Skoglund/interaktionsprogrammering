import { Octokit } from "octokit";

export async function dataFetch(): Promise<Repository[]> {
    const octokit = new Octokit({
        auth: process.env.EXPO_PUBLIC_GIT_KEY
    });

    const rawRespons = await octokit.request("GET /search/repositories", {
        q: "language: python",
        sort: "stars",
        order: "desc",
        per_page: 10,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    const items = rawRespons.data.items as rawRepository[];
    const respons: Repository[] = items.map(shapeRepoData);

    return respons;
}

type rawRepository = {
    id: number;
    full_name: string;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    license: { name: string } | null;
    language: string | null;
    created_at: string;
    topics: string[];
}

export type Repository = {
    id: number;
    fullName: string;
    repoName: string;
    description: string | null;
    url: string;
    stars: number;
    forks: number;
    licenseName: string | null;
    mainLanguage: string | null;
    createdAt: Date;
    topics: string[];
};

function shapeRepoData(repo: rawRepository): Repository {
    return {
        id: repo.id,
        fullName: repo.full_name,
        repoName: repo.name,
        description: repo.description,
        url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        licenseName: repo.license ? repo.license.name : null,
        mainLanguage: repo.language,
        createdAt: new Date(repo.created_at),
        topics: repo.topics,
    };
}