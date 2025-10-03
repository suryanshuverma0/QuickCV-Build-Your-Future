import { useEffect, useState } from "react";

const Template2 = () => {
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
    <div className="bg-white p-8">
      {/* ABOUT SECTION */}
      {about && (
        <section>
          <div className="flex items-center gap-3 flex-col">
            <div className="flex flex-col gap-2 items-center py-3">
              <h1 className="text-2xl font-bold tracking-widest">
                {about.name}
              </h1>
              <h3 className="text-xl font-semibold">{about.designation}</h3>
            </div>
            <div className="flex gap-4 items-center text-md">
              {about.phone && <span>{about.phone}</span>}
              {about.email && <span>{about.email}</span>}
            </div>
            {about.summary && (
              <div
                className="text-md text-justify py-4"
                dangerouslySetInnerHTML={{ __html: about.summary }}
              />
            )}
          </div>
        </section>
      )}

      {/* EXPERIENCE */}
      {resume.experience?.length > 0 && (
        <section className="mt-8">
          <h1 className="font-semibold font-serif">EXPERIENCE</h1>
          <hr className="my-2" />
          <ul className="flex flex-col gap-6 text-md">
            {resume.experience.map((exp) => (
              <li key={exp._id} className="list-none">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-1 items-start">
                    <h1 className="font-semibold">{exp.jobTitle}</h1>
                    <span className="italic">{exp.organization}</span>
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    {exp.location && <span>{exp.location}</span>}
                    <div>
                      <span>{formatDate(exp.startDate)}</span> -{" "}
                      <span>
                        {exp.currentlyWorking
                          ? "Present"
                          : formatDate(exp.endDate)}
                      </span>
                    </div>
                  </div>
                </div>
                {exp.summary &&   <div
    className="pt-2"
    dangerouslySetInnerHTML={{ __html: exp.summary }}
  />}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* EDUCATION */}
      {resume.education?.length > 0 && (
        <section className="mt-8">
          <h1 className="font-semibold font-serif">EDUCATION</h1>
          <hr className="my-2" />
          <ul className="flex flex-col gap-6 text-md">
            {resume.education.map((edu) => (
              <li key={edu._id} className="list-none">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-1 items-start">
                    <h1 className="font-semibold">{edu.degree}</h1>
                    <span className="italic">{edu.school}</span>
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    {edu.location && <span>{edu.location}</span>}
                    <div>
                      <span>{formatDate(edu.startDate)}</span> -{" "}
                      <span>
                        {edu.currentlyStudying
                          ? "Present"
                          : formatDate(edu.endDate)}
                      </span>
                    </div>
                  </div>
                </div>
                {edu.description && <p className="pt-2">{edu.description}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* PROJECTS */}
      {resume.projects?.length > 0 && (
        <section className="mt-8">
          <h1 className="font-semibold font-serif">PROJECTS</h1>
          <hr className="my-2" />
          <ul className="flex flex-col gap-6 text-md">
            {resume.projects.map((proj) => (
              <li key={proj._id} className="list-none">
                <h1 className="font-semibold">{proj.title}</h1>
                {proj.summary &&   <div dangerouslySetInnerHTML={{ __html: proj.summary }} />
}
                {proj.link && (
                  <a
                    className="text-purple-900"
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live Demo
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ACHIEVEMENTS */}
      {resume.achievements?.length > 0 && (
        <section className="mt-8">
          <h1 className="font-semibold font-serif">ACHIEVEMENTS</h1>
          <hr className="my-2" />
          <ul className="flex flex-col gap-6 text-md">
            {resume.achievements.map((ach) => (
              <li key={ach._id} className="list-none">
                <h1 className="font-semibold">{ach.title}</h1>
                <span className="italic">{ach.organization}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* SKILLS */}
      {resume.skills?.length > 0 && (
        <section className="mt-8">
          <h1 className="font-semibold font-serif">SKILLS</h1>
          <hr className="my-2" />
          <ul className="flex flex-wrap gap-4 items-center">
            {resume.skills.map((skill) => (
              <li key={skill._id}>{skill.skill}</li>
            ))}
          </ul>
        </section>
      )}

      {/* LANGUAGES */}
      {resume.languages?.length > 0 && (
        <section className="mt-8">
          <h1 className="font-semibold font-serif">LANGUAGES</h1>
          <hr className="my-2" />
          <ul className="flex flex-wrap gap-4 items-center">
            {resume.languages.map((lang) => (
              <li key={lang._id}>{lang.language}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Template2;
