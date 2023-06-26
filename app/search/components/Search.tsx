import { FC } from 'react'
import SearchBar from './SearchBar'
import CustomFilter from './CustomFilter'

interface SearchProps {}

const Search: FC<SearchProps> = ({}) => {
  return (
    <div className="mt-12 padding-x padding-y max-width" id="discover">
      <div className="flex flex-col items-center justify-center gap-y-2.5 ">
        <h1 className="text-4xl font-extrabold text-center ">جست‌ و جو</h1>
      </div>

      <div className="mt-12 w-full flex-between items-center flex-wrap gap-5">
        <SearchBar />

        <div className="flex justify-start flex-wrap items-center gap-2">
          {/* <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} /> */}
        </div>
      </div>
    </div>
  )
}

export default Search
