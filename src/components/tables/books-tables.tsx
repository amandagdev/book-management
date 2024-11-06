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
import type { BooksProps } from './types'
import Button from '../ui/button/button'
import type { UserProps } from '../../types'
import { MdPreview } from 'react-icons/md'
import { TbBookmarkEdit } from 'react-icons/tb'
import { CiBookmarkRemove } from 'react-icons/ci'
import Modal from '../ui/modal/modal'
import { deleteBook, fetchBooks } from '../../services/books-service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const menuOption = {
  admin: [
    {
      icon: <MdPreview size={22} />,
      id: 'preview',
    },
    { icon: <TbBookmarkEdit size={22} />, onClick: () => {}, id: 'edit' },
    {
      icon: <CiBookmarkRemove size={22} />,
      handleDelete: (
        setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
      ) => {
        setOpenModal((previous) => !previous)
      },
      id: 'exclude',
    },
  ],
  user: [
    {
      icon: <MdPreview size={22} />,
      id: 'preview',
    },
  ],
}

const BooksTable = ({ user }: { user: UserProps }) => {
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()
  const [currentBook, setCurrentBook] = useState<BooksProps>()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data: books = [], refetch } = useQuery({
    queryFn: fetchBooks,
    queryKey: ['books'],
  })

  const booksColumns = [
    {
      accessorKey: 'name',
      header: () => 'Name',
    },
    {
      accessorKey: 'author',
      header: () => 'Author',
    },
    {
      accessorKey: 'pages',
      header: () => 'Pages',
    },
    {
      accessorKey: 'options',
      header: () => 'Options',
      cell: (props: any) => {
        console.log(props.row.original)
        const currentBook = { ...props.row.original }

        return (
          <ul className="flex justify-center gap-5">
            {menuOption[user.role!].map((item) => (
              <li
                key={item.id}
                className="cursor-pointer"
                onClick={() => {
                  if (item.id === 'exclude') {
                    setOpenModal(true)
                    setCurrentBook(currentBook)
                  }

                  if (item.id === 'preview') {
                    navigate(`books/${currentBook.id}`)
                  }

                  if (item.id === 'edit') {
                    navigate(`books/edit-book/${currentBook.id}`)
                  }
                }}
              >
                {item.icon}
              </li>
            ))}
          </ul>
        )
      },
    },
  ]

  const table = useReactTable({
    columns: booksColumns,
    data: books,
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

  const deleteMutation = useMutation({
    mutationFn: () => deleteBook(currentBook?.id as string),
    onSuccess: () => {
      console.log('Livro deletado com sucesso!')
      refetch()
    },
    onError: (error) => {
      console.error('Erro ao fazer login:', error)
    },
  })

  return (
    <div className="p-2 flex flex-col justify-between w-[900px] h-[550px] bg-secondary">
      {openModal && (
        <Modal>
          <div className="bg-secondary p-5">
            <div className="mb-4">
              Certeza em exlcuir o livro {currentBook?.name}?
            </div>
            <div className="flex  gap-4 justify-end">
              <Button
                type="button"
                onClick={() => setOpenModal((previous) => !previous)}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                model="destroy"
                onClick={() => {
                  setOpenModal(false)
                  deleteMutation.mutate()
                }}
              >
                Excluir
              </Button>
            </div>
          </div>
        </Modal>
      )}
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

export default BooksTable
