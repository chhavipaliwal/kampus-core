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
import { TeacherType } from '@/types/teachers';
import { useAllTeachers } from '@/services/teacher';

const INITIAL_VISIBLE_COLUMNS = [
  'email',
  'name',
  'phone',
  'class',
  'admissionDate'
];

export default function Teachers() {
  const router = useRouter();
  const { data, isLoading } = useAllTeachers();

  const teachers: TeacherType[] = data || [];

  // Define columns with render functions
  const columns: ColumnDef<TeacherType>[] = useMemo(
    () => [
      {
        name: 'Email',
        uid: 'email',
        sortable: true,
        renderCell: (teacher) => (
          <div className="truncate lowercase text-default-foreground">
            {teacher.email}
          </div>
        )
      },
      {
        name: 'Name',
        uid: 'name',
        sortable: true,
        renderCell: (teacher) => (
          <div className="truncate text-default-foreground">{teacher.name}</div>
        )
      },
      {
        name: 'Phone',
        uid: 'phone',
        sortable: true,
        renderCell: (teacher) => (
          <div className="truncate text-default-foreground">
            {teacher.phone || 'N/A'}
          </div>
        )
      },
      {
        name: 'Subjects',
        uid: 'subjects',
        sortable: true,
        renderCell: (teacher) => (
          <div className="truncate text-default-foreground">
            {teacher.subjects.join(', ') || 'N/A'}
          </div>
        )
      },
      {
        name: 'Department',
        uid: 'department',
        sortable: true,
        renderCell: (teacher) => (
          <div className="truncate text-default-foreground">
            {teacher.department || 'N/A'}
          </div>
        )
      },
      {
        name: 'Gender',
        uid: 'gender',
        sortable: true,
        renderCell: (teacher) => (
          <div className="truncate text-default-foreground">
            {teacher.gender || 'N/A'}
          </div>
        )
      },
      {
        name: 'Hired Date',
        uid: 'hiredDate',
        sortable: true,
        renderCell: (teacher) =>
          teacher.hiredDate
            ? renderDate({ date: teacher.hiredDate, isTime: true })
            : 'N/A'
      },
      {
        name: 'Created At',
        uid: 'createdAt',
        sortable: true,
        renderCell: (teacher) =>
          renderDate({ date: teacher.createdAt, isTime: true })
      },
      {
        name: 'Updated At',
        uid: 'updatedAt',
        sortable: true,
        renderCell: (teacher) =>
          renderDate({ date: teacher.updatedAt, isTime: true })
      },
      {
        name: 'Actions',
        uid: 'actions',
        sortable: false,
        renderCell: (teacher) =>
          renderActions({
            onView: () => router.push(`/dashboard/users/${teacher._id}`),
            onEdit: () => router.push(`/dashboard/users/${teacher._id}/edit`),
            onDelete: () => console.log('Delete', teacher._id),
            key: teacher._id
          })
      }
    ],
    []
  );

  // Render top bar
  const endContent = () => (
    <Button color="primary" size="sm">
      New teacher
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
      uniqueKey="teachers"
      isLoading={isLoading}
      data={teachers}
      columns={columns}
      initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
      keyField="_id"
      // filters={filters}
      searchField={(teacher, searchValue) =>
        teacher.email.toLowerCase().includes(searchValue.toLowerCase())
      }
      endContent={endContent}
      renderSelectedActions={renderSelectedActions}
      initialSortDescriptor={{
        column: 'createdAt',
        direction: 'descending'
      }}
      onRowAction={(row) => {
        addToast({
          title: 'New teacher',
          description: `teacher ${row} clicked`,
          color: 'success'
        });
      }}
    />
  );
}
