import Image from "next/image";
import type { HomeDict } from "@/app/dictionaries";

interface TeamSectionProps {
  dict: HomeDict["team"];
  lang: string;
}

export function TeamSection({ dict, lang }: TeamSectionProps) {
  return (
    <section id="team" className="bg-white py-32 lg:py-40 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
          <div className="relative w-full min-h-[560px] lg:min-h-[820px]">
            <Image
              alt="Meet the GPMF team"
              className="w-full h-full object-cover"
              src="/team.jpg"
              width={720}
              height={820}
            />
            <div className="absolute bottom-8 left-8 text-white text-[10px] tracking-[0.32em] uppercase opacity-90">
              {dict.studioLocation}
            </div>
          </div>

          <div className="px-8 lg:px-24 py-20 lg:py-0 flex flex-col justify-center items-center min-h-[560px] lg:min-h-[820px]">
            <div className="max-w-xl">
              <span className="tick text-[11px] tracking-[0.28em] uppercase text-burgundy font-semibold">
                {dict.eyebrow}
              </span>
              <h2 className="font-serif text-[48px] lg:text-[80px] text-foreground my-10 leading-[0.98] tracking-[-0.02em]">
                {dict.headlinePart1}
                <br />
                <span className="italic font-medium">{dict.headlineAccent}</span>
              </h2>
              <p className="text-[18px] text-surface-variant mb-12 leading-relaxed max-w-md">
                {dict.description}
              </p>

              <div className="grid grid-cols-2 gap-y-8 gap-x-8 mb-12 max-w-md">
                {dict.members.map((member) => (
                  <div key={member.name}>
                    <p className="font-serif text-xl">{member.name}</p>
                    <p className="text-[11px] tracking-[0.22em] uppercase text-surface-variant mt-1">
                      {member.role}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href={`/${lang}/partners`}
                className="group inline-flex items-center gap-4 border border-outline px-10 py-5 transition-all duration-300 hover:bg-burgundy hover:text-white hover:border-burgundy"
              >
                <span className="text-[11px] uppercase tracking-[0.28em]">{dict.cta}</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
