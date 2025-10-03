import { useEffect, useState } from "react";
import { FaEnvelope, FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import { resumeAPI } from "../api/apiService";
const Template3 = () => {
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await resumeAPI.getMe();
        setResume(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchResume();
  }, []);

  if (!resume) return <p className="text-center mt-10">Loading...</p>;

  const {
    profileImage,
    about,
    experience,
    education,
    projects,
    achievements,
    skills,
    languages,
    socialMedia,
  } = resume;

  // 🗓️ Utility for formatting dates
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const aboutData = about?.[0]; // since about is an array

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10 print:p-0">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden print:shadow-none print:rounded-none">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200 bg-gray-50 text-center">
          <div className="flex flex-col items-center">
            {profileImage?.[0]?.imageUrl && (
              <img
                src={profileImage[0].imageUrl}
                alt="Profile"
                className="w-28 h-28 rounded-full border-2 border-gray-300 mb-3 object-cover"
              />
            )}
            <h1 className="text-3xl font-bold">{aboutData?.name}</h1>
            <p className="text-lg text-gray-600">{aboutData?.designation}</p>
          </div>

          {/* Contact Info */}
          <div className="mt-4">
            <ul className="flex flex-wrap gap-6 justify-center text-sm">
              {aboutData?.phone && (
                <li className="flex items-center gap-1">
                  <BsTelephoneFill className="text-gray-600" />
                  <span>{aboutData.phone}</span>
                </li>
              )}
              {aboutData?.email && (
                <li className="flex items-center gap-1">
                  <FaEnvelope className="text-gray-600" />
                  <span>{aboutData.email}</span>
                </li>
              )}
              {socialMedia?.linkedin && (
                <li className="flex items-center gap-1">
                  <FaLinkedin className="text-gray-600" />
                  <a
                    href={socialMedia.linkedin}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
              {socialMedia?.github && (
                <li className="flex items-center gap-1">
                  <FaGithub className="text-gray-600" />
                  <a
                    href={socialMedia.github}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
              )}
              {socialMedia?.website && (
                <li className="flex items-center gap-1">
                  <FaGlobe className="text-gray-600" />
                  <a
                    href={socialMedia.website}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="md:w-1/3 bg-gray-50 p-6 space-y-6">
            {/* Education */}
            {education?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold border-b pb-1 mb-2">
                  Education
                </h2>
                <ul className="space-y-3">
                  {education.map((edu) => (
                    <li key={edu._id}>
                      <h3 className="font-bold">{edu.degree}</h3>
                      <p className="text-sm text-gray-600">
                        {edu.school}, {edu.location}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatDate(edu.startDate)} -{" "}
                        {edu.currentlyStudying
                          ? "Present"
                          : formatDate(edu.endDate)}
                      </p>
                      {edu.description && (
                        <p className="text-sm">{edu.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills */}
            {skills?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold border-b pb-1 mb-2">
                  Skills
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <li
                      key={skill._id}
                      className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs"
                    >
                      {skill.skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Languages */}
            {languages?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold border-b pb-1 mb-2">
                  Languages
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <li
                      key={lang._id}
                      className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs"
                    >
                      {lang.language}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>

          {/* Right Content */}
          <main className="md:w-2/3 p-6 space-y-6">
            {/* Profile Summary */}
            {aboutData?.summary && (
              <section>
                <h2 className="text-xl font-semibold border-b pb-1 mb-2">
                  Profile
                </h2>
                <div
                  className="text-gray-700 text-justify"
                  dangerouslySetInnerHTML={{ __html: aboutData.summary }}
                />
              </section>
            )}

            {/* Experience */}
            {experience?.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold border-b pb-1 mb-2">
                  Experience
                </h2>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp._id}>
                      <h3 className="font-bold text-lg">{exp.jobTitle}</h3>
                      <p className="text-sm text-gray-600">
                        {exp.organization}, {exp.location}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatDate(exp.startDate)} -{" "}
                        {exp.currentlyWorking
                          ? "Present"
                          : formatDate(exp.endDate)}
                      </p>
                      <div
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{ __html: exp.summary }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects?.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold border-b pb-1 mb-2">
                  Projects
                </h2>
                <div className="space-y-4">
                  {projects.map((proj) => (
                    <div key={proj._id}>
                      <h3 className="font-bold text-lg">{proj.title}</h3>
                      <div
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{ __html: proj.summary }}
                      />

                      {proj.link && (
                        <a
                          href={proj.link}
                          className="text-blue-600 hover:underline text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Achievements */}
            {achievements?.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold border-b pb-1 mb-2">
                  Achievements
                </h2>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {achievements.map((ach) => (
                    <li key={ach._id}>
                      {ach.title} {ach.organization && `- ${ach.organization}`}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Template3;
