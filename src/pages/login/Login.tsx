import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";
import loginPng from "../../assets/communication-social-media-icons-smartphone-device.png";
import { useLogin } from "../../hooks/auth.hook";
import Button from "../../components/button";

interface ILoginData {
    username: string;
    password: string;
}

const loginValidationSchema = z
    .object({
        username: z.string().min(5).max(15),
        password: z.string().min(8),
    })
    .required();

const Login: React.FC = () => {
    const { mutate: login, isPending: logingIsPending } = useLogin();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginData>({
        resolver: zodResolver(loginValidationSchema),
    });
    const onSubmit = (data: ILoginData) => {
        // API call to login
        login(data);
    };
    return (
        <div className="flex flex-row relative">
            <div className="laptop:w-1/2 w-full py-16 px-4 flex justify-center">
                <>
                    <svg
                        width="567"
                        height="645"
                        viewBox="0 0 567 645"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-0 blur-3xl opacity-40 laptop:block hidden z-10"
                    >
                        <ellipse
                            cx="248.806"
                            cy="322.5"
                            rx="322.5"
                            ry="317.806"
                            transform="rotate(90 248.806 322.5)"
                            fill="#C5FFEA"
                        />
                    </svg>
                    <svg
                        width="112"
                        height="323"
                        viewBox="0 0 112 323"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-0 blur-3xl opacity-40 laptop:hidden block z-10"
                    >
                        <ellipse
                            cx="-47.5968"
                            cy="161.25"
                            rx="161.25"
                            ry="158.903"
                            transform="rotate(90 -47.5968 161.25)"
                            fill="#C5FFEA"
                        />
                    </svg>
                    <svg
                        width="111"
                        height="323"
                        viewBox="0 0 111 323"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-0 bottom-1 blur-2xl opacity-40 laptop:hidden block z-10"
                    >
                        <ellipse
                            cx="158.903"
                            cy="161.25"
                            rx="161.25"
                            ry="158.903"
                            transform="rotate(90 158.903 161.25)"
                            fill="#ACDCFF"
                        />
                    </svg>
                </>
                <div className="w-[444px] flex flex-col laptop:gap-6 gap-11 px-1 z-10">
                    <div>
                        <img src="/kufuli-logo.svg" alt="kufuli-logo" />
                    </div>
                    <div className="w-full flex flex-col gap-6 px-1 z-10">
                        <div className="flex flex-col gap-2">
                            <h1 className="font-extrabold laptop:text-5xl text-4xl">
                                Welcome Back!
                            </h1>
                            <p className="laptop:text-xl text-base">
                                Log in to manage your stories, connect with
                                influencers, and grow your reach.
                            </p>
                        </div>
                        <form
                            className="flex flex-col gap-6"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold laptop:text-base text-xs">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    {...register("username")}
                                    placeholder="Enter your username"
                                    className="font-normal laptop:text-base text-xs w-full px-4 py-3 border-2 border-[#D9D9D9] bg-transparent rounded-lg focus:outline-none focus:border-[#4CCEF7]"
                                />
                                {errors.username && (
                                    <p className="text-xs text-red-500">
                                        {errors.username.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold laptop:text-base text-xs">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    {...register("password")}
                                    placeholder="Enter your password"
                                    className="font-normal laptop:text-base text-xs w-full px-4 py-3 border-2 border-[#D9D9D9] bg-transparent rounded-lg focus:outline-none focus:border-[#4CCEF7]"
                                />
                                {errors.password && (
                                    <p className="text-xs text-red-500">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex justify-end px-2 font-semibold laptop:text-base text-xs">
                                <Link
                                    to="/forgot-password"
                                    className="p-1 rounded-lg focus:border-2 focus:outline-none focus:border-[#4CCEF7]"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Button className="" isLoading={logingIsPending}>Login</Button>
                        </form>
                        <div className="flex justify-center items-center gap-2 laptop:text-base text-xs">
                            <span>New to Kufuli?</span>{" "}
                            <Link to="/signup" className="font-extrabold">
                                Sign Up Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-h-lvh w-1/2 laptop:flex hidden justify-center items-center bg-gradient-to-bl from-[#91FFDB] to-[#4CCEF7]">
                <img
                    src={loginPng}
                    alt="communication-social-media-icons-smartphone-device"
                    className="object-contain w-4/5 h-4/5"
                />
            </div>
        </div>
    );
};

export default Login;
