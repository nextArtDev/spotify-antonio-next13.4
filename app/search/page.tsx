import { FC } from 'react'
import Search from './components/Search'
import { SearchAccordion } from './components/SearchAccordion'

interface searchPageProps {}

const searchPage: FC<searchPageProps> = ({}) => {
  return (
    <section>
      {/* <Search /> */}
      <SearchAccordion />
    </section>
  )
}

export default searchPage
