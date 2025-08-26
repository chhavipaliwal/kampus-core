'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Form,
  Input,
  RadioGroup,
  ScrollShadow,
  Select,
  SelectItem,
  Textarea,
  Tooltip
} from '@heroui/react';
import { useFormik } from 'formik';
import { Icon } from '@iconify/react/dist/iconify.js';

import CustomRadio from '@/components/ui/custom-radio';
import { renderChip } from '@/components/ui/data-table/cell-renderers';
import { Genders } from '@/lib/option';
import { castData, generateEmail, generatePhoneNumber } from '@/lib/utils';
import { useCreateStudent } from '@/services/student';
import { useAllUsers } from '@/services/user';
import { CreateStudentType } from '@/types/students';
import { UserType } from '@/types/user';

export default function NewStudent() {
  const router = useRouter();
  const { data: session } = useSession();
  const createStudent = useCreateStudent();
  const [inputValue, setInputValue] = useState('');

  const { data: usersData, isLoading: isUsersLoading } = useAllUsers();
  const users = castData<UserType[]>(usersData) || [];

  // filter out teachers/admins if student should only be mapped to normal users
  const filteredUsers =
    inputValue === ''
      ? users
      : users.filter(
          (user) =>
            user.name.toLowerCase().includes(inputValue.toLowerCase()) ||
            user.email.toLowerCase().includes(inputValue.toLowerCase()) ||
            user.uid.toString().includes(inputValue)
        );

  const formik = useFormik({
    initialValues: {
      creation_type: 'new'
    } as CreateStudentType,
    onSubmit: async (values) => {
      await createStudent.mutateAsync(values).then(() => {
        router.push('/dashboard/students');
      });
    }
  });

  return (
    <Card
      className="bg-transparent p-2 shadow-none"
      as={Form}
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
    >
      <CardHeader className="flex flex-col items-start px-4 pb-0 pt-4">
        <p className="text-large">Add New Student</p>
      </CardHeader>

      <CardBody>
        <ScrollShadow className="grid grid-cols-1 gap-4 p-1 md:grid-cols-2">
          <RadioGroup
            label="Select an existing user or create a new student"
            orientation="horizontal"
            className="col-span-full"
            value={formik.values.creation_type}
            onValueChange={(value) => {
              formik.setFieldValue('creation_type', value);
            }}
          >
            <CustomRadio
              description="Create a student from scratch"
              value="new"
            >
              New Student
            </CustomRadio>
            <CustomRadio
              description="Create a student from an existing user"
              value="existing"
            >
              Existing User
            </CustomRadio>
          </RadioGroup>

          {formik.values.creation_type === 'existing' ? (
            <Autocomplete
              isRequired
              isVirtualized
              itemHeight={50}
              label="Select User"
              isLoading={isUsersLoading}
              items={filteredUsers.filter(
                (user) => user.role !== 'moderator' && user.role !== 'admin'
              )}
              className="grid-cols-2 bg-gradient-to-b"
              placeholder="Type to search"
              showScrollIndicators={false}
              onSelectionChange={(value) => {
                formik.setFieldValue('uid', value);
              }}
              onInputChange={setInputValue}
              selectedKey={formik.values.uid}
              description={
                formik.values.uid
                  ? `UID: #${users.find((user) => user.uid == formik.values.uid)?.uid}`
                  : null
              }
            >
              {(user) => (
                <AutocompleteItem
                  key={user.uid}
                  textValue={user.name}
                  variant="flat"
                  endContent={renderChip({
                    item: user.role,
                    size: 'sm'
                  })}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                      <span className="text-small">{user.name}</span>
                      <span className="text-tiny text-default-400">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </AutocompleteItem>
              )}
            </Autocomplete>
          ) : (
            <>
              <Input
                isRequired
                label="Name"
                placeholder="Enter Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              <Input
                isRequired
                label="Email"
                placeholder="Enter email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                endContent={
                  session?.user?.role === 'admin' && (
                    <Tooltip content="Generate a random email">
                      <Button
                        isIconOnly
                        radius="full"
                        size="sm"
                        isDisabled={!formik.values.name}
                        onPress={() => {
                          const email = generateEmail(formik.values.name);
                          formik.setFieldValue('email', email);
                        }}
                      >
                        <Icon icon="solar:refresh-bold" />
                      </Button>
                    </Tooltip>
                  )
                }
              />
              <Input
                label="Phone Number"
                placeholder="Enter phone number"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                startContent={
                  <span className="text-small text-default-400">+91</span>
                }
              />
              <Select
                isRequired
                label="Gender"
                placeholder="Select Gender"
                selectedKeys={[formik.values.gender]}
                name="gender"
                onChange={formik.handleChange}
                items={Genders}
                disallowEmptySelection
              >
                {(item) => (
                  <SelectItem key={item.value}>{item.label}</SelectItem>
                )}
              </Select>
            </>
          )}

          <Divider className="col-span-full" />

          {/* Student specific fields */}

          <Input
            label="Roll Number"
            placeholder="e.g. 21CS001"
            name="rollNumber"
            value={formik.values.rollNumber}
            onChange={formik.handleChange}
          />

          <Input
            isRequired
            label="Class"
            placeholder="e.g. First Year"
            name="class"
            value={formik.values.class}
            onChange={formik.handleChange}
          />
          <Input
            label="Section"
            placeholder="e.g. A"
            name="section"
            value={formik.values.section}
            onChange={formik.handleChange}
          />
          <Textarea
            label="Address"
            placeholder="Enter address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            className="col-span-full"
          />
        </ScrollShadow>
      </CardBody>

      <CardFooter className="mt-4 justify-end gap-2">
        <Button
          color="primary"
          radius="full"
          isLoading={formik.isSubmitting}
          type="submit"
        >
          Create Student
        </Button>
      </CardFooter>
    </Card>
  );
}
