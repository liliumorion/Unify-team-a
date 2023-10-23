import Image from "next/image";
import { useTranslation } from "next-i18next";
import profile from "public/images/profile.svg";
import { useState } from "react";
import { BsFillPencilFill, BsImageFill } from "react-icons/bs";

import useImageUpload from "@/lib/useImageUpload";

import ImageSpinner from "./ImageSpinner";

function UserProfile({ userData }) {
  const { i18n, t } = useTranslation();
  const loaction =
    userData.location === "1- Adrar"
      ? t("states:adrar")
      : t(`states:${userData.location}`);
  const [selectedImage, setSelectedImage] = useState(null);
  const { loading, updateImage } = useImageUpload();

  const handleImageChange = async (e) => {
    const imageFile = e.target.files[0];
    const downloadURL = await updateImage(userData, imageFile);
    setSelectedImage(downloadURL);
  };

  return (
    <div className='flex flex-col md:flex-row gap-4 justify-center items-start'>
      <section className='flex flex-row gap-2 items-center justify-center w-full md:w-1/4 md:flex-col'>
        <figure className='relative group'>
          {loading && (
            <ImageSpinner classes='absolute bg-white rounded-full h-full md:w-32 w-28 top-0 bg-opacity-30 flex items-center justify-center ' />
          )}
          <Image
            className='object-cover md:w-32 w-28 rounded-full'
            height={150}
            width={150}
            src={selectedImage || userData.photoURL || profile}
            alt='User Profile'
          />
          <div
            type='file'
            className='absolute hidden text-center bg-white rounded-full h-full md:w-32 w-28 top-0 group-hover:flex cursor-pointer bg-opacity-40 items-center justify-center'
          >
            <input
              type='file'
              id='fileInput'
              onChange={handleImageChange}
              accept='image/*'
              className='absolute hidden text-xs'
            ></input>
            <label htmlFor='fileInput' className='text-4xl cursor-pointer'>
              <BsImageFill />
            </label>
          </div>
        </figure>
        <div className='md:text-center text:start w-full'>
          <h3 className='font-bold text-xl'>{userData.name}</h3>
          <p className='text-md text-gray-600'>{loaction}</p>
        </div>
      </section>
      {/* user info............................... */}
      <section
        className='flex md:justify-between md:items-center md:flex-row mt-6 gap-2 bg-gray-200 md:gap-6 w-full rounded-xl'
        dir={i18n?.language == "ar" ? "rtl" : "ltr"}
      >
        <div className='flex flex-col md:flex-row gap-2 p-6 md:gap-6 flex-1'>
          <div className='flex flex-col gap-2'>
            <p>
              <span className='font-bold'>
                {t("dashboard:userinfo:Name")}:{" "}
              </span>
              <span>{userData.name}</span>
            </p>
            <p>
              <span className='font-bold'>
                {t("dashboard:userinfo:Location")}:{" "}
              </span>
              <span>{loaction}</span>
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <p>
              <span className='font-bold'>
                {t("dashboard:userinfo:Email")}:{" "}
              </span>
              <span>{userData.email}</span>
            </p>
            <p>
              <span className='font-bold'>
                {t("dashboard:userinfo:Phonenumber")}:{" "}
              </span>
              <span>{userData.phone ? userData.phone : "-"}</span>
            </p>
          </div>
          <p className='self-start'>
            <span className='font-bold'>
              {t("dashboard:userinfo:language")}:{" "}
            </span>
            <span>{i18n.language}</span>
          </p>
        </div>
        <div
          className={`self-start md:self-stretch md:bg-gray-300 ${
            i18n?.language == "ar"
              ? "md:rounded-tl-xl md:rounded-bl-xl"
              : "md:rounded-tr-xl md:rounded-br-xl"
          }`}
        >
          <button className='btn btn-ghost h-full'>
            <BsFillPencilFill />
          </button>
        </div>
      </section>
    </div>
  );
}

export default UserProfile;
