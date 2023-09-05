import { useEffect } from 'react'

import { todolistApi } from '@/common/api/common-api.ts'

export function App() {
  useEffect(() => {
    todolistApi.getTodolists().then(res => console.log(res.data.map(el => el.title)))
  }, [])

  return <div>Hello</div>
}
