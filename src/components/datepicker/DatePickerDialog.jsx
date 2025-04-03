import { useEffect, useId, useRef, useState } from "react";
import { format, isValid, parse } from "date-fns";
import { DayPicker } from "react-day-picker";

export function DatePickerDialog({ data, placeholderText, onDateSelect, resetKey, css }) {
  const dialogId = useId();
  const headerId = useId();
  const [month, setMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [inputValue, setInputValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Khi resetKey thay đổi, reset lại state của DatePickerDialog
  useEffect(() => {
    setInputValue("");
    setSelectedDate(undefined);
    setMonth(new Date());
  }, [resetKey]);

  // Ref để lưu timer delay đóng dialog
  const leaveTimerRef = useRef(null);

  const handleDayPickerSelect = (date) => {
    if (!date) {
      setInputValue("");
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setInputValue(format(date, "MM/dd/yyyy"));  // Format lại ngày khi chọn
      if (onDateSelect) {
        onDateSelect(date);
      }
    }
    setIsDialogOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const parsedDate = parse(e.target.value, "MM/dd/yyyy", new Date());
    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
      setMonth(parsedDate);
    } else {
      setSelectedDate(undefined);
    }
  };

  const handleMouseEnter = () => {
    // Nếu có timer đóng dialog, hủy nó
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setIsDialogOpen(true);
  };

  const handleMouseLeave = () => {
    // Delay 1s trước khi đóng dialog
    leaveTimerRef.current = setTimeout(() => {
      setIsDialogOpen(false);
    }, 1000);
  };

  // Format lại data nếu nó là một đối tượng ngày hợp lệ
  const formattedData = data ? format(new Date(data), "MM/dd/yyyy") : "";

  return (
    <div className="flex flex-col gap-2">
      <input
        id="date-input"
        type="text"
        value={formattedData || inputValue}
        placeholder={placeholderText}
        onChange={handleInputChange}
        className={css}
      />
      {/* Vùng chứa cho button và dialog */}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          aria-controls={dialogId}
          aria-haspopup="dialog"
          aria-expanded={isDialogOpen}
          aria-label="Open calendar to choose booking date"
          className="absolute right-0 mt-[-2.5rem] mr-3 text-gray-500 hover:text-blue-500 z-10"
        >
          📆
        </button>
        <dialog
          id={dialogId}
          open={isDialogOpen}
          className="absolute -top-16 -left-16 bg-gray-200 p-5 rounded-lg w-full shadow-lg z-50"
          aria-modal
          aria-labelledby={headerId}
        >
          <DayPicker
            classNames={{
              caption_label:
                "text-lg font-semibold text-red-700 text-center absolute top-5 left-1/2 transform -translate-x-1/2",
              nav: "flex justify-between items-center space-x-2 mb-8",
              nav_button: "text-blue-500 hover:text-blue-500",
              day: "w-14 h-auto rounded-full transition-colors hover:bg-blue-200 text-center my-2",
              selected: "bg-blue-600 text-white",
              today: "border border-blue-400",
            }}
            month={month}
            onMonthChange={setMonth}
            mode="single"
            required
            selected={selectedDate}
            onSelect={handleDayPickerSelect}
            className="text-black justify-between"
          />
        </dialog>
      </div>
    </div>
  );
}
