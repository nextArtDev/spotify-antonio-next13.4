## proper way to pass Server component inside a client component
We pass all of our children of _layout_ to sidebar and mark our sidebar to client component by _use client_ *and it douse not mean that everything inside in our sidebar(layout childs become a client component)* because we pass them ass **_children_**

## Tailwind Merge
$npm i tailwind-merge
exactly like cn or clasnames

## How to Pass icons (react-icons) in TS

first import IconType from icons-react
then antialias(?) it to capital Icon to use it as a component
 
```typescript
import {iconTypes} from react-icons

interface Sidebar{
    ...
    icon: IconTypes
}
const SidebarItem: FC<SidebarItemProps> = ({ icon:Icon}) => {
  return (
    <Link
      href={href}
      className={twMerge(` text-neutral-400 py-1`, active && 'text-white'
      )}
    >
        <Icon  />
      آیتم ها{' '}
    </Link>
  )
``