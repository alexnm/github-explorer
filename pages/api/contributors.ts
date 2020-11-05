import { request } from '@octokit/request'
import { IncomingMessage, ServerResponse } from 'http'

export default async (req: IncomingMessage, res: ServerResponse) => {
  // @ts-ignore
  const { owner, repo } = req.query

  if (!owner || !repo) {
    res.statusCode = 400

    // @ts-ignore
    res.json({ status: 'Bad request' })
    return
  }

  const result = await request('GET /repos/{owner}/{repo}/contributors', {
    headers: {
      authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
    owner,
    repo,
    per_page: 100,
  })

  // @ts-ignore
  const mappedResult = result.data.map((user) => ({
    id: user.id,
    name: user.login,
    avatar: user.avatar_url,
    url: user.html_url,
    contributions: user.contributions,
  }))

  res.statusCode = 200
  // @ts-ignore
  res.json(mappedResult)
}
