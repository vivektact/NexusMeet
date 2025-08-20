import React, { useState } from 'react';

const languages = [
  "English",
  "Hindi",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Arabic",
  "Bengali",
  "Japanese",
  "Russian",
];

export default function RegisterPage() {
  const [nativeLang, setNativeLang] = useState('');
  const [desiredLang, setDesiredLang] = useState('');

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <form className="card-body">
          {/* Profile pic at the top */}
          <div className="flex justify-center mb-4">
            <div className="avatar">
              <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {/* Placeholder image */}
                <img src="https://ui-avatars.com/api/?name=User&background=random" alt="Profile" />
              </div>
            </div>
          </div>

          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input type="text" placeholder="username" className="input input-bordered" required />
          
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="name" className="input input-bordered" required />
          
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
          
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />

          {/* Native Language Selector */}
          <label className="label">
            <span className="label-text">Native Language</span>
          </label>
          <select
            className="select select-bordered"
            value={nativeLang}
            onChange={(e) => setNativeLang(e.target.value)}
            required
          >
            <option value="">Select your native language</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>

          {/* Desired Language Selector */}
          <label className="label">
            <span className="label-text">Desired Language</span>
          </label>
          <select
            className="select select-bordered"
            value={desiredLang}
            onChange={(e) => setDesiredLang(e.target.value)}
            required
          >
            <option value="">Select desired language</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>

          <label className="label">
            <span className="label-text">Bio</span>
          </label>
          <textarea placeholder="Bio" className="textarea textarea-success" />

          <input type="file" className="file-input file-input-neutral" />
          
          {/* Buttons */}
          <div className="form-control mt-6 flex flex-row gap-4">
            <button type="button" className="btn btn-primary" onClick={() => {/* handle login navigation */}}>
              Login
            </button>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
