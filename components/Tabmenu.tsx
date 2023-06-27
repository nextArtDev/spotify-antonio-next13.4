'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sine, gsap } from 'gsap'
import { useEffect, useRef } from 'react'

export function TabsDemo() {
  const refContainer = useRef<HTMLDivElement>(null)
  const refCircle1 = useRef<SVGCircleElement>(null)
  const refCircle2 = useRef<SVGCircleElement>(null)
  const refSvg = useRef<SVGSVGElement>(null)
  const navRef = useRef([])

  useEffect(() => {
    if (navRef.current) {
      gsap.set(refCircle1.current, { transformOrigin: '50%' })
      gsap.set(refCircle2.current, { transformOrigin: '50%' })

      navRef.current.forEach((link: HTMLButtonElement, index: number) => {
        link.addEventListener('click', (e: Event) => {
          let tl1 = gsap.timeline({ paused: true })
          let tl2 = gsap.timeline({ paused: true, delay: 0.05 })

          tl1.to(refCircle1.current, {
            x: `${33 * index}vw`,
            duration: 0.2,
            ease: Sine.easeInOut,
          })
          tl1.to(
            refCircle1.current,
            {
              scale: 1.2,
              scaleY: 0.8,
              duration: 0.1,
              ease: Sine.easeInOut,
            },
            0
          )
          tl1.to(
            refCircle1.current,
            {
              scale: 1,
              scaleY: 1,
              duration: 0.1,
              ease: Sine.easeInOut,
            },
            0.25
          )
          tl2.to(refCircle2.current, {
            x: `${33 * index}vw`,
            duration: 0.2,
            ease: Sine.easeInOut,
          })
          tl2.to(
            refCircle2.current,
            {
              scale: 1.2,
              scaleY: 0.8,
              duration: 0.1,
              ease: Sine.easeInOut,
            },
            0
          )
          tl2.to(
            refCircle2.current,
            {
              scale: 1,
              scaleY: 1,
              duration: 0.1,
              ease: Sine.easeInOut,
            },
            0.25
          )
          tl1.play()
          tl2.play()
          e.preventDefault()
        })
      })
    }
  }, [])
  return (
    <Tabs
      ref={refContainer}
      defaultValue="account"
      className="relative w-full mt-24"
    >
      <svg
        ref={refSvg}
        width="100%"
        height="120"
        className="absolute -top-20 left-[5%] md:left-[12%] -z-10 "
      >
        <filter id="blurMe">
          {' '}
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
        </filter>
        <circle ref={refCircle1} cx="60" cy="60" r="25" fill="#CA4F01" />
        <circle
          ref={refCircle2}
          cx="65"
          cy="60"
          r="28"
          fill="#FFE47F"
          filter="url(#blurMe)"
        />
      </svg>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger ref={(el) => (navRef.current[0] = el)} value="account">
          {' '}
          Account{' '}
        </TabsTrigger>
        <TabsTrigger ref={(el) => (navRef.current[1] = el)} value="password">
          {' '}
          Password{' '}
        </TabsTrigger>
        <TabsTrigger ref={(el) => (navRef.current[2] = el)} value="new">
          {' '}
          new{' '}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              {' '}
              Make changes to your account here. Click save when youre done.{' '}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, youll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            {' '}
            <Button>Save password</Button>{' '}
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="new">
        <Card>
          <CardHeader>
            <CardTitle>new</CardTitle>
            <CardDescription>
              Change your password here. After saving, youll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            {' '}
            <Button>Save password</Button>{' '}
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
