'use client';

import { useMemo } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import {
  addToast,
  Button,
  DropdownItem,
  DropdownMenu,
  Selection
} from '@heroui/react';

import { Table } from '@/components/ui/data-table';
import {
  renderActions,
  renderDate
} from '@/components/ui/data-table/cell-renderers';
import type { ColumnDef } from '@/components/ui/data-table/types';
import { useAllStudents } from '@/services/student';
import { StudentType } from '@/types/students';

const INITIAL_VISIBLE_COLUMNS = ['email', 'updatedAt', 'createdAt'];

export default function Students() {
  const router = useRouter();
  const { data, isLoading } = useAllStudents();

  const students: StudentType[] = data || [];

  // Define columns with render functions
  const columns: ColumnDef<StudentType>[] = useMemo(
    () => [
      {
        name: 'Email',
        uid: 'email',
        sortable: true,
        renderCell: (student) => (
          <div className="truncate lowercase text-default-foreground">
            {student.email}
          </div>
        )
      },
      {
        name: 'Name',
        uid: 'name',
        sortable: true,
        renderCell: (student) => (
          <div className="truncate text-default-foreground">{student.name}</div>
        )
      },
      {
        name: 'Phone',
        uid: 'phone',
        sortable: true,
        renderCell: (student) => (
          <div className="truncate text-default-foreground">
            {student.phone || 'N/A'}
          </div>
        )
      },
      {
        name: 'Class',
        uid: 'class',
        sortable: true,
        renderCell: (student) => (
          <div className="truncate text-default-foreground">
            {student.class || 'N/A'}
          </div>
        )
      },
      {
        name: 'Roll Number',
        uid: 'rollNumber',
        sortable: true,
        renderCell: (student) => (
          <div className="truncate text-default-foreground">
            {student.rollNumber || 'N/A'}
          </div>
        )
      },
      {
        name: 'Gender',
        uid: 'gender',
        sortable: true,
        renderCell: (student) => (
          <div className="truncate text-default-foreground">
            {student.gender || 'N/A'}
          </div>
        )
      },
      {
        name: 'Admission Date',
        uid: 'admissionDate',
        sortable: true,
        renderCell: (student) =>
          renderDate({ date: student.admissionDate, isTime: true })
      },
      {
        name: 'Termination Date',
        uid: 'terminationDate',
        sortable: true,
        renderCell: (student) =>
          student.terminationDate
            ? renderDate({ date: student.terminationDate, isTime: true })
            : 'N/A'
      },
      {
        name: 'Created At',
        uid: 'createdAt',
        sortable: true,
        renderCell: (student) =>
          renderDate({ date: student.createdAt, isTime: true })
      },
      {
        name: 'Updated At',
        uid: 'updatedAt',
        sortable: true,
        renderCell: (student) =>
          renderDate({ date: student.updatedAt, isTime: true })
      },
      {
        name: 'Actions',
        uid: 'actions',
        sortable: false,
        renderCell: (student) =>
          renderActions({
            onView: () => router.push(`/dashboard/users/${student._id}`),
            onEdit: () => router.push(`/dashboard/users/${student._id}/edit`),
            onDelete: () => console.log('Delete', student._id),
            key: student._id
          })
      }
    ],
    []
  );

  // Render top bar
  const endContent = () => (
    <Button color="primary" size="sm">
      New Student
    </Button>
  );

  const renderSelectedActions = (selectedKeys: Selection) => (
    <DropdownMenu aria-label="Selected Actions">
      <DropdownItem
        key="bulk-edit"
        onPress={() => {
          console.log('Bulk edit', selectedKeys);
        }}
      >
        Bulk edit
      </DropdownItem>
      <DropdownItem
        key="export"
        onPress={() => {
          console.log('Export', selectedKeys);
        }}
      >
        Export
      </DropdownItem>
      <DropdownItem
        key="delete"
        className="text-danger"
        onPress={() => {
          console.log('Delete', selectedKeys);
        }}
      >
        Delete
      </DropdownItem>
    </DropdownMenu>
  );

  return (
    <Table
      uniqueKey="students"
      isLoading={isLoading}
      data={students}
      columns={columns}
      initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
      keyField="_id"
      // filters={filters}
      searchField={(student, searchValue) =>
        student.email.toLowerCase().includes(searchValue.toLowerCase())
      }
      endContent={endContent}
      renderSelectedActions={renderSelectedActions}
      initialSortDescriptor={{
        column: 'createdAt',
        direction: 'descending'
      }}
      onRowAction={(row) => {
        addToast({
          title: 'New Student',
          description: `Student ${row} clicked`,
          color: 'success'
        });
      }}
    />
  );
}
