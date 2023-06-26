import { FC } from 'react'
import Search from './components/Search'

interface searchPageProps {}

const searchPage: FC<searchPageProps> = ({}) => {
  return (
    <section>
      <Search />
    </section>
  )
}

export default searchPage
