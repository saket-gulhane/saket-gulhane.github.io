import { useEffect, useState } from 'react'
import { loadGitHub } from './github'
import type { GitHubData } from './github'

export type GitHubState =
  | { status: 'loading' }
  | { status: 'ready'; data: GitHubData }
  | { status: 'error' }

export function useGitHub(): GitHubState {
  const [state, setState] = useState<GitHubState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    loadGitHub()
      .then((data) => {
        if (!cancelled) setState({ status: 'ready', data })
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' })
      })
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
