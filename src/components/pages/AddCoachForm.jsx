"use client";
import { useForm, Controller } from "react-hook-form";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { genericFetch } from "@/libs/externalAPIs";
import { setToast } from "@/libs/notificationsAPIs";

export default function RegisterPage(props) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      specializations: "",
    },
  });

  async function onSubmit(data) {
    const params = {
      url: "/user",
      body: data,
      method: "POST",
    };
    const res = await genericFetch(params);
    if (res.statusCode === 200) {
      if (props.saveData) props.saveData();
    } else {
      setToast(res.body.error, "error", params.url + res.statusCode);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded p-5 flex flex-col"
    >
      <div className="flex items-center gap-5 mb-3">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              label="Name"
              name="name"
              errors={errors}
              placeholder="Jane"
              {...register("name", {
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
              {...field}
            />
          )}
        />

        <Controller
          name="lastname"
          control={control}
          render={({ field }) => (
            <Input
              label="Last Name"
              name="lastname"
              errors={errors}
              placeholder="Doe"
              {...register("lastname", {
                required: {
                  value: true,
                  message: "Last Name is required",
                },
              })}
              {...field}
            />
          )}
        />
      </div>

      <div className="flex items-center gap-5 mb-3">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              label="Email"
              name="email"
              type="email"
              errors={errors}
              placeholder="email@domain.com"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              label="Password"
              name="password"
              errors={errors}
              placeholder="********"
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
              {...field}
            />
          )}
        />
      </div>

      <div className="w-full mb-3">
        <Controller
          name="specializations"
          control={control}
          render={({ field }) => (
            <Input
              label="Specializations"
              name="specializations"
              errors={errors}
              placeholder="specialization1, specialization2, specialization3"
              {...register("specializations", {
                required: {
                  value: true,
                  message: "Specializations is required",
                },
              })}
              {...field}
            />
          )}
        />
      </div>

      <div className="flex gap-5">
        <Button
          color="orchid"
          className="w-full"
          type="outline"
          onClick={() => props.closeDialog({ show: false })}
        >
          Cancel
        </Button>
        <Button color="mindaro" className="w-full">
          Register
        </Button>
      </div>
    </form>
  );
}
