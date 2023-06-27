'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import Image from 'next/image'

interface Option {
  name: string
  value: number | string
  doctorId?: number[]
}

interface ComboboxDemoProps {
  options: Option[]
  imageSrc: string
  text: string
  setSearchedDoctorsId: React.Dispatch<React.SetStateAction<number[]>>
  searchedDoctorsId: number[]
}
export function ComboboxDemo({
  options,
  text,
  imageSrc,
  setSearchedDoctorsId,
  searchedDoctorsId,
}: ComboboxDemoProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between "
        >
          <div className="flex gap-2 ">
            <Image
              src={imageSrc}
              width={25}
              height={25}
              className=" w-[20px] h-[20px] bg-transparent "
              alt="ایکون"
            />
            {value
              ? options.find((option) => option.name === value)?.name
              : `${text}`}
          </div>
          {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        {/* <PopoverContent className="w-[200px] p-0 bg-white border rounded shadow-lg absolute z-10 mt-2"> */}
        <Command>
          <CommandInput />
          <CommandEmpty>پیدا نشد.</CommandEmpty>
          <CommandGroup className=" scrollbar gap-4 max-h-96 overflow-y-auto scrollbar-w-6 scrollbar-track-red-400 scrollbar-thumb-red-600 scrollbar-thumb-rounded hover:scrollbar-thumb-red-700">
            {options.map((option) => (
              <CommandItem
                key={option.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue)
                  setOpen(false)
                  // option.doctorId
                  //   ? option.doctorId.map((doci) => console.log(doci))
                  //   : console.log(option.value)
                  if (option.doctorId) {
                    console.log(option.doctorId)
                    setSearchedDoctorsId(option.doctorId)
                  } else {
                    const doctorid = [+option.value]
                    console.log(doctorid)
                    setSearchedDoctorsId(doctorid)
                  }
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === option.name ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {option.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
