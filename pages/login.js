import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import { setCookies } from "cookies-next";
import Base from "../components/layout/Base";
import { FaFacebook, FaGoogle, FaSpinner } from "react-icons/fa";
import Link from "next/link";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const schema = yup.object().shape({
    identifier: yup.string().required("Identifiant obligatoire"),
    password: yup
      .string()
      .min(6, "Mot de passe court")
      .required("Mot de passe obligatoire"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function login(infos) {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:1337/auth/local", {
        body: JSON.stringify(infos),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const data = await res.json();
      if (data.jwt) {
        let options = {
          sameSite: "none",
          secure: true,
        };
        localStorage.setItem("token", data.jwt);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("parkingInfo", data.user.parking?.id);
        setCookies("parking", data.user.parking?.id, options);
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Base>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <div className="text-2xl">👤</div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Connectez-vous a votre compte
            </h2>
            <p className="text-gray-600 mt-2">
              Entrez vos informations de connexion
            </p>
          </div>

          <form onSubmit={handleSubmit(login)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Identifiant
              </label>
              <input
                type="text"
                placeholder="Identifiant"
                {...register("identifier")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.identifier && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.identifier.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                placeholder="Mot de passe"
                {...register("password")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <Link href="#">
                <a className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Mot de passe oublie ?
                </a>
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading && <FaSpinner className="animate-spin" />}
              Connexion
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Ou connectez-vous avec
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
              <FaFacebook /> Facebook
            </button>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
              <FaGoogle /> Google
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Pas encore de compte ?
              </span>
            </div>
          </div>

          <Link href="/register">
            <a className="w-full block text-center bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              S'inscrire
            </a>
          </Link>
        </div>
      </div>
    </Base>
  );
}
