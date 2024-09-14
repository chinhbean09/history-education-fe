import React from 'react';
import { useGetAllCourseQuery } from '../../../services/coursesAPI';
import ImportIcon from '../../../assets/Icon';
import { Image, Spin, Empty } from 'antd';
import group from '../../../assets/image/team-check-alt.svg'
import play from '../../../assets/image/play-alt.svg'
import clock from '../../../assets/image/clock.svg'
import crown from '../../../assets/image/king.svg'
import free from '../../../assets/image/free.svg'
import { Link } from 'react-router-dom';
const CourseList = () => {

    const { data: courses, error, isLoading } = useGetAllCourseQuery();

    const handleDisplayTime = (time) => {
        if (time < 60) {
            return <span>{time} Phút</span>;
        } else {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            return <span>{hours} Giờ {minutes > 0 ? `${minutes} Phút` : ''}</span>;
        }
    }

    // Phân loại khóa học
    const freeCourses = courses?.filter(course => !course.isPaidCourse);
    const paidCourses = courses?.filter(course => course.isPaidCourse);
    if (isLoading)
        return
    <div>
        <Spin tip="Loading" size="large">
            Đợi một xíu nha
        </Spin>;
    </div>;

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='p-8'>
            <div>
                <h2
                    className='m-6 ml-2 font-ExtraBold text-2xl'>
                    Khóa học trả phí
                    <Image className='mb-[-3px] ml-4' width={30} src={crown} />
                </h2>
                <div className='flex gap-5 flex-wrap'>
                    {paidCourses.length > 0 ? paidCourses.map(course => (
                        <div key={course.id} className="hover:shadow-lg relative hover:-translate-y-1 transition duration-200 rounded-b-[16px]">
                            <div className='px-[8px] py-[4px] w-fit rounded-lg absolute top-3 left-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                                <Image preview={false} width={23} src={crown} />
                            </div>
                            <Link
                                to={'tutorial/' + course.id}
                                className='text-black'
                            >
                                <img src={course.image} alt={course.name} className='rounded-t-[16px] max-w-[300px]' />
                                <div className='bg-[#f7f7f7] py-2 rounded-b-[16px]'>
                                    <p className='font-Bold text-[17px] pt-3 pb-2 px-5 text-black'>{course.name}</p>
                                    <p className='px-5 font-SemiBold text-[16px] text-[#f05123]'>
                                        {course.price.toLocaleString('vi-VN')}đ
                                    </p>
                                    <div className='flex mt-6 mb-2 justify-between flex-row text-black items-center px-5'>
                                        <p className='flex gap-2 '>
                                            <Image preview={false} width={20} src={group} />
                                            {course.numberUSerSubcribe.toLocaleString('vi-VN')}
                                        </p>
                                        <p className='flex gap-2'>
                                            <Image preview={false} width={20} src={play} />
                                            {course.totalLessons.toLocaleString('vi-VN')}
                                        </p>
                                        <p className='flex gap-2'>
                                            <Image preview={false} width={20} src={clock} />
                                            {handleDisplayTime(course.totalDuration)}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>

                    )) : <Empty description="Không có khóa học trả phí" />}
                </div>
            </div>
            <div className='mt-[60px]'>
                <h2 className='mb-6 ml-2 font-ExtraBold text-2xl '>
                    Khóa học miễn phí
                    <Image preview={false} className='mb-[-10px] ml-4' width={35} src={free} />
                </h2>
                <div className='flex gap-5 flex-wrap'>
                    {freeCourses.length > 0 ? freeCourses.map(course => (
                        <div key={course.id} className="hover:shadow-lg hover:-translate-y-1 transition duration-200 rounded-b-[16px]">
                            <Link
                                to={'tutorial/' + course.id}
                                className='text-black'
                            >
                                <img src={course.image} alt={course.name} className='rounded-t-[16px] max-w-[270px]' />
                                <div className='bg-[#f7f7f7] py-2 rounded-b-[16px]'>
                                    <p className='font-Bold text-[17px] pt-3 pb-2 px-5 text-black'>{course.name}</p>
                                    <p className='px-5 font-SemiBold text-[16px] text-[#f05123]'>Miễn phí</p>
                                    <div className='flex mt-6 mb-2 justify-between flex-row text-black items-center px-5'>
                                        <p className='flex gap-2 '>
                                            <Image preview={false} width={20} src={group} />
                                            {course.numberUSerSubcribe.toLocaleString('vi-VN')}
                                        </p>
                                        <p className='flex gap-2'>
                                            <Image preview={false} width={20} src={play} />
                                            {course.totalLessons.toLocaleString('vi-VN')}
                                        </p>
                                        <p className='flex gap-2'>
                                            <Image preview={false} width={20} src={clock} />
                                            {handleDisplayTime(course.totalDuration)}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>

                    )) : <Empty description="Không có khóa học miễn phí" />}
                </div>
            </div>

        </div >
    );
};

export default CourseList;