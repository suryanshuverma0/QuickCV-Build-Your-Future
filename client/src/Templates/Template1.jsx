import { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";

const Template1 = () => {
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch resume");
        const data = await res.json();
        setResume(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchResume();
  }, []);

  if (!resume) return <p className="text-center py-10">Loading...</p>;

  const about = resume.about?.[0];

  // 📅 Utility: Format dates
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="w-full bg-gray-50 font-sans">
      <div className="grid grid-cols-12 shadow-lg rounded-lg overflow-hidden">
        {/* LEFT SIDEBAR */}
        <div className="col-span-4 bg-gray-900 text-white p-6 flex flex-col items-center">
          {/* PROFILE IMAGE (optional) */}
          {resume.profileImage?.[0]?.imageUrl && (
            <div className="my-6">
              <img
                src={resume.profileImage[0].imageUrl}
                alt="profile"
                className="rounded-full w-40 h-40 object-cover border-4 border-gray-700 shadow-md"
              />
            </div>
          )}

          {/* CONTACT */}
          {(about?.phone || about?.email) && (
            <section className="w-full mt-6">
              <h2 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-3">
                Contact
              </h2>
              <div className="space-y-2 text-sm">
                {about?.phone && (
                  <div className="flex items-center gap-2">
                    <BsFillTelephoneFill /> <span>{about.phone}</span>
                  </div>
                )}
                {about?.email && (
                  <div className="flex items-center gap-2">
                    <FaEnvelope /> <span>{about.email}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* EDUCATION */}
          {resume.education?.length > 0 && (
            <section className="w-full mt-6">
              <h2 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-3">
                Education
              </h2>
              <ul className="space-y-3 text-sm">
                {resume.education.map((edu) => (
                  <li key={edu._id}>
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="italic">{edu.school}</p>
                    <p className="text-xs text-gray-300">
                      {formatDate(edu.startDate)} -{" "}
                      {edu.currentlyStudying
                        ? "Present"
                        : formatDate(edu.endDate)}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* SKILLS */}
          {resume.skills?.length > 0 && (
            <section className="w-full mt-6">
              <h2 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-3">
                Skills
              </h2>
              <ul className="flex flex-wrap gap-2 text-xs">
                {resume.skills.map((skill) => (
                  <li
                    key={skill._id}
                    className="bg-gray-700 px-3 py-1 rounded-full"
                  >
                    {skill.skill}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* LANGUAGES */}
          {resume.languages?.length > 0 && (
            <section className="w-full mt-6">
              <h2 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-3">
                Languages
              </h2>
              <ul className="space-y-1 text-sm">
                {resume.languages.map((lang) => (
                  <li key={lang._id}>{lang.language}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-span-8 bg-white p-8 flex flex-col gap-8">
          {/* HEADER */}
          {about && (
            <header className="border-b pb-4">
              <h1 className="text-3xl font-bold">{about.name}</h1>
              <h3 className="text-lg text-gray-600">{about.designation}</h3>
            </header>
          )}

          {/* SUMMARY */}
          {about?.summary && (
            <section>
              <h2 className="text-xl font-semibold mb-2">Profile</h2>
              <div
                className="text-sm text-gray-700 leading-relaxed text-justify"
                dangerouslySetInnerHTML={{ __html: about.summary }}
              />
            </section>
          )}

          {/* EXPERIENCE */}
          {resume.experience?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
              <div className="space-y-4 text-sm">
                {resume.experience.map((exp) => (
                  <div key={exp._id}>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{exp.jobTitle}</span>
                      <span className="text-xs text-gray-500">
                        {formatDate(exp.startDate)} –{" "}
                        {exp.currentlyWorking
                          ? "Present"
                          : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="italic">{exp.organization}</p>
                    {exp.summary && (
                      <div
                        className="mt-1 text-gray-700"
                        dangerouslySetInnerHTML={{ __html: exp.summary }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* PROJECTS */}
          {resume.projects?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-2">Projects</h2>
              <div className="space-y-3 text-sm">
                {resume.projects.map((proj) => (
                  <div key={proj._id}>
                    <h3 className="font-bold">{proj.title}</h3>
                    {proj.summary && (
                      <div
                        dangerouslySetInnerHTML={{ __html: proj.summary }}
                      />
                    )}
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline text-xs"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ACHIEVEMENTS */}
          {resume.achievements?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-2">Achievements</h2>
              <div className="space-y-3 text-sm">
                {resume.achievements.map((ach) => (
                  <div key={ach._id}>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{ach.title}</span>
                      <span className="text-xs text-gray-500">
                        {formatDate(ach.startDate)} –{" "}
                        {ach.endDate ? formatDate(ach.endDate) : "Present"}
                      </span>
                    </div>
                    <p className="italic">{ach.organization}</p>
                    {ach.description && (
                      <div
                        className="mt-1 text-gray-700"
                        dangerouslySetInnerHTML={{ __html: ach.description }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template1;
