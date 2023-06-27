'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import Image from 'next/image'
import React, { useState } from 'react'
import { ComboboxDemo } from './ComboboxDemo'
import { doctors, illness, special } from '@/constants'

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

export function SearchAccordion() {
  const [searchedDoctorsId, setSearchedDoctorsId] = useState<number[]>([])
  return (
    <Accordion type="single" collapsible dir="rtl" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex">
            <p>جست‌وجوی دکتر</p>
            <Image
              src={'/images/doctor.png'}
              width={25}
              height={25}
              className=" w-[20px] h-[20px] bg-transparent "
              alt="ایکون"
            />
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ComboboxDemo
            options={doctorsOptions}
            text="دکتر"
            imageSrc="/images/doctor.png"
            setSearchedDoctorsId={setSearchedDoctorsId}
            searchedDoctorsId={searchedDoctorsId}
          />
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
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>جست‌وجوی عنوان بیماری</AccordionTrigger>
        <AccordionContent>
          <ComboboxDemo
            options={illnessOptions}
            text="بیماری"
            imageSrc="/images/disease.png"
            setSearchedDoctorsId={setSearchedDoctorsId}
            searchedDoctorsId={searchedDoctorsId}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>جست‌وجوی تخصص دکتر</AccordionTrigger>
        <AccordionContent>
          <ComboboxDemo
            options={specialOptions}
            text="تخصص"
            imageSrc="/images/doctor.png"
            setSearchedDoctorsId={setSearchedDoctorsId}
            searchedDoctorsId={searchedDoctorsId}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
