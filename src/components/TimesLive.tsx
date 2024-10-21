import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Modal from 'react-modal';
import dayjs from 'dayjs';

const TimesLive = () => {
    const [plans, setPlans] = useState<{ title: string; start: string; end: string; description: string; }[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPlan, setNewPlan] = useState({ title: '', start: '', end: '', description: '' });
    const [selectedPlanIndex, setSelectedPlanIndex] = useState<number | null>(null);

    // Create 24 hours
    const startTime = dayjs().startOf('day'); // Starts at 00:00
    const timeSlots = Array.from({ length: 24 }, (_, i) => startTime.add(i, 'hour')); // 24 hours

    const addPlan = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        const rect = target.getBoundingClientRect();
        const clickY = e.clientY - rect.top;
        const hourIndex = Math.floor(clickY / 240); // 240px per hour
        const slotIndex = Math.floor((clickY % 240) / 40); // 40px per 10-minute slot

        if (hourIndex >= 0 && hourIndex < 24 && slotIndex >= 0 && slotIndex < 6) {
            const start = timeSlots[hourIndex].add(slotIndex * 10, 'minute').format();
            setNewPlan({
                title: '',
                start: start,
                end: timeSlots[hourIndex].add((slotIndex + 1) * 10, 'minute').format(),
                description: '',
            });
            setIsModalOpen(true);
        }
    };

    const handleDragStop = (index: number, e: any, data: any) => {
        const updatedPlans = [...plans];
        const hourIndex = Math.floor(data.y / 240); // Calculate hour based on drag position
        const slotIndex = Math.floor((data.y % 240) / 40); // Calculate slot based on drag position
        const newStart = timeSlots[hourIndex].add(slotIndex * 10, 'minute').format();

        updatedPlans[index].start = newStart;
        updatedPlans[index].end = dayjs(newStart).add(10, 'minute').format(); // Update end time
        setPlans(updatedPlans);
    };

    const handlePlanDoubleClick = (index: number) => {
        setSelectedPlanIndex(index);
        setNewPlan(plans[index]);
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedPlans = [...plans];

        if (selectedPlanIndex !== null) {
            updatedPlans[selectedPlanIndex] = newPlan;
        } else {
            updatedPlans.push(newPlan);
        }

        setPlans(updatedPlans);
        setNewPlan({ title: '', start: '', end: '', description: '' });
        setIsModalOpen(false);
        setSelectedPlanIndex(null);
    };

    return (
        <div className="relative w-full h-[5760px] border-l border-gray-300"> {/* 5760px height for 24 hours */}
            <div className="text-center font-bold text-lg py-4 bg-gray-200">
                Lập Kế Hoạch Hằng Ngày
            </div>

            <div className="relative w-full h-full" onDoubleClick={addPlan}>
                <div className="absolute w-full h-full grid grid-cols-24 text-center" style={{ marginLeft: '100px' }}>
                    {timeSlots.map((time, hourIndex) => (
                        <div
                            className="house"
                            key={hourIndex}
                            style={{ height: '240px', width: '100%', position: 'relative', borderBottom: '1px solid #e2e2e2' }}
                        >
                            {Array.from({ length: 6 }, (_, slotIndex) => (
                                <div
                                    className="slot border-t border-gray-200 flex items-center justify-center"
                                    key={slotIndex}
                                    data-hour={time.add(slotIndex * 10, 'minute').format('HHmm')}
                                    data-pretty-time={time.add(slotIndex * 10, 'minute').format('hh:mm A')}
                                    data-till={time.add((slotIndex + 1) * 10, 'minute').format('HHmm')}
                                    style={{ height: '40px', cursor: 'pointer' }} // Each slot is 40px tall
                                >
                                    {slotIndex === 0 && <span className="no-sessions">Nhấp đúp vào đây để thêm phiên họp của bạn</span>}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Time labels on the left side */}
                <div className="absolute" style={{ left: '0px', width: '100px', top: '0' }}>
                    {timeSlots.map((time, hourIndex) => (
                        <div key={hourIndex} style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span className="text-center">{time.format('HH:mm')}</span>
                        </div>
                    ))}
                </div>

                {plans.map((plan, index) => {
                    const start = dayjs(plan.start);
                    const startHour = start.hour();
                    const startMinute = start.minute();

                    // Calculate top position based on hours and minutes
                    const topPosition = (startHour * 240) + (startMinute / 60) * 240;

                    return (
                        <Draggable key={index} onStop={(e, data) => handleDragStop(index, e, data)}>
                            <div
                                className="absolute bg-blue-200 rounded-md p-2 cursor-move"
                                style={{ top: topPosition, left: '150px', width: '200px' }}
                                onDoubleClick={() => handlePlanDoubleClick(index)} // Open modal on double-click
                            >
                                <h4 className="font-semibold">{plan.title}</h4>
                                <p>{dayjs(plan.start).format('HH:mm')} - {dayjs(plan.end).format('HH:mm')}</p>
                                <p>{plan.description}</p>
                            </div>
                        </Draggable>
                    );
                })}


                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    style={{
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            width: '300px',
                            height: '400px',
                            padding: '20px',
                        },
                    }}
                >
                    <h2>{selectedPlanIndex !== null ? 'Cập Nhật Kế Hoạch' : 'Thêm Kế Hoạch Mới'}</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Tiêu đề:
                            <input
                                type="text"
                                value={newPlan.title}
                                onChange={e => setNewPlan({ ...newPlan, title: e.target.value })}
                                required
                            />
                        </label>
                        <label>
                            Thời gian bắt đầu:
                            <input
                                type="time"
                                value={dayjs(newPlan.start).format('HH:mm')}
                                onChange={e => {
                                    const [hours, minutes] = e.target.value.split(':').map(Number);
                                    const newStart = dayjs().startOf('day').add(hours, 'hour').add(minutes, 'minute').format();
                                    setNewPlan({ ...newPlan, start: newStart });
                                }}
                                required
                            />
                        </label>
                        <label>
                            Thời gian kết thúc:
                            <input
                                type="time"
                                value={dayjs(newPlan.end).format('HH:mm')}
                                onChange={e => {
                                    const [hours, minutes] = e.target.value.split(':').map(Number);
                                    const newEnd = dayjs().startOf('day').add(hours, 'hour').add(minutes, 'minute').format();
                                    setNewPlan({ ...newPlan, end: newEnd });
                                }}
                                required
                            />
                        </label>
                        <label>
                            Miêu tả:
                            <textarea
                                value={newPlan.description}
                                onChange={e => setNewPlan({ ...newPlan, description: e.target.value })}
                            />
                        </label>
                        <button type="submit">{selectedPlanIndex !== null ? 'Cập Nhật' : 'Thêm'}</button>
                    </form>
                </Modal>
            </div>
        </div>
    );
};

export default TimesLive;
