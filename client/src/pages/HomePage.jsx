import CourseCard from "../components/CourseCard";
import FooterCom from '../components/Footer';
import Header from "../components/Header"
export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <CoursesList/>
      <FooterCom/>
      </>
  )
}

function CoursesList() {
  return (
    <section id="courses" className="bg-yellow-50  dark:bg-slate-800">
      <div className="container pt-16 pb-14 px-4  md:px-8 mx-auto">
        <h1 className="text-center text-4xl font-bold font-montserrat text-slate-900 dark:text-white capitalized">
          Explore courses
        </h1>
        <CourseCard/>
      </div>
    </section>
  );
}

function Hero(){
  return (
    <div className="relative">
      <section className="bg-yellow-50 dark:bg-slate-800 font-montserrat overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:min-h-[800px]">
          <div className="relative flex items-center justify-center w-full lg:order-2 lg:w-7/12">
            <div className="absolute bottom-0 right-0 hidden lg:block">
              <img
                className="object-contain w-auto h-48"
                src="line.png"
                alt=""
              />
            </div>

            <div className="relative px-4 pt-24 pb-16 text-center sm:px-6 md:px-24 2xl:px-32 lg:py-24 lg:text-left">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-6xl xl:text-6xl">
                Empower Your Future.
                <br />
                Learn Fast, Succeed Sooner.
              </h1>
              <p className="mt-8 text-xl text-slate-900 dark:text-white">
                Explore top-rated courses and certifications from leading
                instructors.
              </p>
              <div className="mt-10">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full px-4 py-4 mt- font-semibold text-white transition-all duration-200 dark:bg-yellow-700 dark:hover:bg-yellow-600 border border-transparent rounded-full sm:w-auto sm:ml-4 sm:mt-0 hover:bg-slate-900 focus:bg-slate-900"
                >
                  Enroll Now
                </button>
              </div>
            
            </div>
          </div>

          <div className="relative w-full overflow-hidden lg:order-1 h-96 lg:h-auto lg:w-5/12">
            <div className="absolute inset-0">
              <img
                className="object-cover object-center w-full h-full scale-150"
                src="/man.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}