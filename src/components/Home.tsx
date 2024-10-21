import React from 'react';
import {CalendarDaysIcon, HandRaisedIcon} from "@heroicons/react/24/outline";

const Home: React.FC = () => {
    return (
        <div className="bg-gray-100">
            {/* Header */}
            <header className="bg-gradient-to-r from-[#f27405] to-[#079dd9] text-white py-10">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold">Chào mừng đến với trang BeeIT</h1>
                    <p className="mt-4 text-lg">Khám phá các dịch vụ tuyệt vời của chúng tôi.</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img
                            src="/images/maxresdefault.jpg"
                            alt="..."
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">Đại nhạc hội Happy bee 13</h2>
                            <p className="mt-2 text-gray-600">Trưởng cao đẳng FPT Polytechnic.</p>
                            <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500">
                                Tìm hiểu thêm
                            </button>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img
                            src="/images/hinh-5-80.jpg"
                            alt="Hình ảnh dịch vụ 2"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">Sự kiện bia Heineken</h2>
                            <p className="mt-2 text-gray-600">Mở kết nối bừng sắt xuân</p>
                            <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500">
                                Tìm hiểu thêm
                            </button>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img
                            src="/images/Anh-trai-say-hi-concert-3.jpg"
                            alt="Hình ảnh dịch vụ 3"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">Anh Trai “Say Hi” Concert 2024</h2>
                            <p className="mt-2 text-gray-600">Khu đô thị Vạn Phúc, Quốc lộ 13, P. Hiệp Bình Phước, TP. Thủ Đức, TP. HCM</p>
                            <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500">
                                Tìm hiểu thêm
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                        <div className="max-w-xl lg:max-w-lg">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Subscribe to our
                                newsletter.</h2>
                            <p className="mt-4 text-lg leading-8 text-gray-300">
                                Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing velit quis. Duis
                                tempor incididunt
                                dolore.
                            </p>
                            <div className="mt-6 flex max-w-md gap-x-4">
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    autoComplete="email"
                                    className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                                <button
                                    type="submit"
                                    className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>
                        <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                            <div className="flex flex-col items-start">
                                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                    <CalendarDaysIcon aria-hidden="true" className="h-6 w-6 text-white"/>
                                </div>
                                <dt className="mt-4 font-semibold text-white">Weekly articles</dt>
                                <dd className="mt-2 leading-7 text-gray-400">
                                    Non laboris consequat cupidatat laborum magna. Eiusmod non irure cupidatat duis
                                    commodo amet.
                                </dd>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                    <HandRaisedIcon aria-hidden="true" className="h-6 w-6 text-white"/>
                                </div>
                                <dt className="mt-4 font-semibold text-white">No spam</dt>
                                <dd className="mt-2 leading-7 text-gray-400">
                                    Officia excepteur ullamco ut sint duis proident non adipisicing. Voluptate
                                    incididunt anim.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                    />
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-200 py-6 mt-10">
                <div className="container mx-auto text-center">
                    <p className="text-gray-600">© 2024 Công ty của bạn. Bản quyền thuộc về bạn.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
