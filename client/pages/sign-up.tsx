/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";
import { Form, Formik } from "formik";

import Button from "components/atoms/Button";
import NextHead from "components/atoms/NextHead";
import { useAuthMethods } from "hooks/authMethods";
import { SignUpFormSchema } from "shared/validation";
import CustomForm from "components/molecules/CustomForm";

const SignUp = () => {
  const { handleSignUpSubmit: handleAuthSubmit } = useAuthMethods();
  const [isPassHidden, setIsPassHidden] = useState<boolean>(true);

  const formikInitialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  return (
    <>
      <NextHead title="BarClerk | Sign Up" />
      <main className="bg-barclerk-30 min-h-screen h-full mobile:pb-20 mobile:pt-10 py-10 flex justify-center items-center px-10">
        <div className="flex flex-col gap-10 w-[360px]">
          <header className="flex flex-col items-center h-full justify-center">
            <img src="/images/logo-transparent.png" className="h-[180px] w-[201px]" alt="logo" />
            <h1 className="text-[36px] font-semibold text-white mobile:text-[30px]">Register Account</h1>
          </header>

          <div className=" flex flex-col gap-4">
            <Formik
              initialValues={formikInitialValues}
              validationSchema={SignUpFormSchema}
              onSubmit={handleAuthSubmit}
            >
              {({ isSubmitting }): any => {
                return (
                  <Form>
                    <div className="flex flex-col gap-4 ">
                      <div className="flex flex-row gap-4 mobile:flex-col">
                        <CustomForm
                          label="First Name"
                          name="first_name"
                          type="text"
                          placeholder="John"
                        />
                        <CustomForm
                          label="Last Name"
                          name="last_name"
                          type="text"
                          placeholder="Doe"
                        />
                      </div>
                      <CustomForm
                        label="Email address"
                        name="email"
                        type="email"
                        placeholder="john.doe@email.com"
                      />
                      <CustomForm
                        label="Password"
                        name="password"
                        type={isPassHidden ? "password" : "text"}
                        placeholder="●●●●●●●"
                        isPassHidden={isPassHidden}
                        setIsPassHidden={setIsPassHidden}
                      />
                      <CustomForm
                        label="Confirm Password"
                        name="password_confirmation"
                        type={isPassHidden ? "password" : "text"}
                        placeholder="●●●●●●●●"
                      />
                    </div>
                    
                    <Button isSubmitting={isSubmitting} value="Register" className="mt-10" />
                  </Form>
                )
              }}
            </Formik>

            <div className="flex flex-col gap-5 justify-center items-center">
              <span className="block text-md font-medium text-slate-300">
                Already have an account?
                <span className="text-barclerk-10 cursor-pointer hover:text-barclerk-10/70 ml-1" >
                  <Link href="./sign-in">Login</Link>
                </span>
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignUp;
