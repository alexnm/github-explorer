import { request } from '@octokit/request'
import { IncomingMessage, ServerResponse } from 'http'

export default async (req: IncomingMessage, res: ServerResponse) => {
  const githubResult = await request('GET /search/repositories', {
    headers: {
      authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
    q: 'stars:>500',
    sort: 'stars',
    order: 'desc',
  })

  const mappedResult = githubResult.data.items.map((repo) => ({
    id: repo.id,
    name: repo.name,
    ownerName: repo.owner.login,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    description: repo.description,
  }))

  res.statusCode = 200

  // @ts-ignore
  res.json(mappedResult)
}
