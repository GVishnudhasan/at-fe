export type FoodMenuType = {
  id: string;
  week_day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  color_code: string;
};

type FoodMenuSectionPropsType = {
  foodMenuFromServer: FoodMenuType[];
};

const FoodMenuSection = ({
  foodMenuFromServer = [],
}: FoodMenuSectionPropsType) => {
  const weekDay = {
    monday: 'rgb(255, 222, 212)',
    tuesday: 'rgb(255, 234, 203)',
    wednesday: 'rgb(215, 186, 186)',
    thrusday: 'rgb(236, 233, 255)',
    friday: 'rgb(230, 239, 229)',
    saturday: 'rgb(197, 220, 255)',
    sunday: 'rgb(242, 225, 255)',
  };
  return (
    <div className="flex h-[70%] flex-wrap overflow-auto">
      {foodMenuFromServer?.map((dailyFoodMenu: FoodMenuType) => {
        return (
          <div
            key={dailyFoodMenu?.id || Math.random()}
            className="h-[45%] w-full px-2 py-3 md:w-1/2 lg:w-1/4"
          >
            <div
              style={{
                background:
                  weekDay[
                    dailyFoodMenu?.week_day?.toLowerCase().replaceAll(' ', '')
                  ],
              }}
              className="h-53.5 w-full rounded-3xl px-4.5 py-6.5 font-bold text-theme-black lg:h-full"
            >
              <div className="mb-3">{dailyFoodMenu?.week_day}</div>
              <div className="h-[80%] overflow-auto">
                <div className="pt-3 text-xs">
                  <div>Breakfast:</div>
                  <div className="font-title">{dailyFoodMenu?.breakfast}</div>
                </div>
                <div className="mt-3 text-xs">
                  <div>Lunch:</div>
                  <div className="font-title">{dailyFoodMenu?.lunch}</div>
                </div>
                <div className="mt-3 text-xs">
                  <div>Dinner:</div>
                  <div className="font-title">{dailyFoodMenu?.dinner}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FoodMenuSection;
