import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  PaginationState,
} from '@tanstack/react-table'
import { useState } from 'react'
import Button from '../ui/button/button'
import type { UserProps } from '../../types'
import { useQuery } from '@tanstack/react-query'
import { changeRole, loadUsers } from '../../services/user-service'

const UsersTable = ({ user }: { user: UserProps }) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data: users = [] } = useQuery({
    queryFn: loadUsers,
    queryKey: ['users'],
  })

  const usersColumns = [
    {
      accessorKey: 'name',
      header: () => 'Name',
    },
    {
      accessorKey: 'email',
      header: () => 'Email',
    },
    {
      accessorKey: 'id',
      header: () => 'Id',
    },
    {
      accessorKey: 'role',
      header: () => 'Role',
      cell: (props: any) => {
        const currentUser = { ...props.row.original }
        console.log(currentUser)

        return (
          currentUser.id !== user.id &&
          currentUser.id !== '1' && (
            <select
              className="text-black"
              defaultValue={currentUser.role}
              onChange={(e) =>
                changeRole(currentUser.id, currentUser, e.target.value)
              }
            >
              <option value="user" className="text-black">
                User
              </option>
              <option value="admin" className="text-black">
                Admin
              </option>
            </select>
          )
        )
      },
    },
  ]

  const table = useReactTable({
    columns: usersColumns,
    data: users,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    debugTable: true,
  })

  return (
    <div className="p-2 flex flex-col justify-between w-[900px] h-[550px] bg-secondary">
      <table className="w-full mb-8">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="w-[300px] pb-2">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="text-center border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls flex items-center justify-between">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </Button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </span>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </Button>
      </div>
    </div>
  )
}

export default UsersTable
