'use client'

import React from 'react'
import JobsForm from '../components/main/JobsForm'

export default function page() {
  return (
    <div className='w-full h-full' >
      <div role="status" className="max-w-full animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 max-w-[360px]"></div>
        <span className="sr-only ">Loading...</span>
      </div>
    </div>
  )
}
