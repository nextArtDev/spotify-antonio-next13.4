'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProfileForm } from './Form'
import { ComboboxForm } from './Combobox'
import { ComboboxDemo } from './ComboboxDemo'
import { doctors, illness, special } from '@/constants'

// import SearchManufacturer from './SearchManufacturer'

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src={'/magnifying-glass.svg'}
      alt={'magnifying glass'}
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
)

const doctorsOptions = doctors.map((doctor) => ({
  name: doctor.name,
  value: doctor.id,
  // illnessId: doctor.illnessId,
}))

const illnessOptions = illness.map((illness) => ({
  name: illness.name,
  value: illness.id,
  doctorId: illness.doctorId,
}))
const specialOptions = special.map((special) => ({
  name: special.name,
  value: special.id,
  doctorId: special.doctorId,
}))
const SearchBar = () => {
  const [manufacturer, setManuFacturer] = useState('')
  const [model, setModel] = useState('')
  const [searchedDoctorsId, setSearchedDoctorsId] = useState<number[]>([])
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (manufacturer.trim() === '' && model.trim() === '') {
      return alert('Please provide some input')
    }

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase())
  }

  const updateSearchParams = (model: string, manufacturer: string) => {
    // Create a new URLSearchParams object using the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search)

    // Update or delete the 'model' search parameter based on the 'model' value
    if (model) {
      searchParams.set('model', model)
    } else {
      searchParams.delete('model')
    }

    // Update or delete the 'manufacturer' search parameter based on the 'manufacturer' value
    if (manufacturer) {
      searchParams.set('manufacturer', manufacturer)
    } else {
      searchParams.delete('manufacturer')
    }

    // Generate the new pathname with the updated search parameters
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`

    router.push(newPathname)
  }

  return (
    <>
      <form
        className="flex items-center justify-start max-sm:flex-col w-full relative max-sm:gap-4 max-w-3xl"
        onSubmit={handleSearch}
      >
        {/* <div className=" max-sm:w-[90%] space-y-2 flex-col md:flex justify-between gap-2 items-center relative"> */}
        <ComboboxDemo
          options={doctorsOptions}
          text="نام دکتر"
          imageSrc="/images/doctor.png"
          setSearchedDoctorsId={setSearchedDoctorsId}
          searchedDoctorsId={searchedDoctorsId}
        />
        <ComboboxDemo
          options={illnessOptions}
          text="عنوان بیماری"
          imageSrc="/images/disease.png"
          setSearchedDoctorsId={setSearchedDoctorsId}
          searchedDoctorsId={searchedDoctorsId}
        />
        <ComboboxDemo
          options={specialOptions}
          text="تخصص"
          imageSrc="/images/doctor.png"
          setSearchedDoctorsId={setSearchedDoctorsId}
          searchedDoctorsId={searchedDoctorsId}
        />
        {/* <ComboboxDemo
          options={illnessList}
          text="عنوان بیماری"
          imageSrc="/images/disease.png"
        />
        <ComboboxDemo
          options={doctorsList}
          text="نام دکتر"
          imageSrc="/images/doctor.png"
        />
        */}

        {/* <SearchManufacturer
          manufacturer={manufacturer}
          setManuFacturer={setManuFacturer}
        /> */}
        {/* <SearchButton otherClasses="sm:hidden" /> */}
        {/* </div> */}
        {/* <div className="flex-1 max-sm:w-full flex justify-start items-center relative">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan..."
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div> */}
        {/* <SearchButton otherClasses="max-sm:hidden" /> */}
      </form>
      <div className="flex flex-col">
        {doctors.map((doctor) => {
          return searchedDoctorsId.map((searchesid) => {
            if (doctor.id === searchesid) {
              return (
                <div className="flex flex-col" key={doctor.id}>
                  <span>{doctor.id}</span>
                  <span>{doctor.name}</span>
                  <span>{doctor.specialty}</span>
                </div>
              )
            }
          })
        })}
      </div>
    </>
  )
}

export default SearchBar
