import { ComboboxDemo } from '@/components/Combobox'
import SigninButton from '@/components/SigninButton'
import { TabsDemo } from '@/components/Tabmenu'
import { SearchAccordion } from './search/components/SearchAccordion'

export default function Home() {
  return (
    <div className="">
      <SigninButton />
      <SearchAccordion />
      <TabsDemo />
    </div>
  )
}
