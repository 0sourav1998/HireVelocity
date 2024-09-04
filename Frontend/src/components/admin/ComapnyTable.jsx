
import React from 'react'
import { Table ,TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Edit2, MoreHorizontal } from 'lucide-react'

const ComapnyTable = () => {
  return (
    <div className='max-w-6xl mx-auto mt-5'>
      <Table>
        <TableCaption>A List Of recent Registered Companies</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Posted Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
                <TableCell>LOGO</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Date Posted</TableCell>
                <TableCell className="text-right">
                    <Popover className="gap-y-4">
                        <PopoverTrigger>
                            <MoreHorizontal/>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className='flex gap-4 cursor-pointer items-center w-fit'>
                                <Edit2 className='w-4'/>
                                <div>Edit</div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default ComapnyTable
