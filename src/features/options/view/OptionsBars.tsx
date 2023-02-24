import { FC } from "react";

import { useAppDispatch, useAppSelector } from "../../../model/hooks";
import {
  orderSelector,
  reorderCouncilOptions,
  updateOrder,
} from "../control/optionsSlice";
import { Order } from "../model/optionModel";

import OptionColumn from "./OptionColumn";
// import OptionInfo from "./OptionInfo";
interface OptionsBarsProps {
  councilId: string;
  handleShowAddOption: Function;
}

export interface OptionsAnim {
  totalWidth: number;
  options: Array<{
    optionId: string;
    width: number;
  }>;
}

const optionsAnim: OptionsAnim = { totalWidth: 0, options: [] };
const barWidth = 120;

const OptionsBars: FC<OptionsBarsProps> = ({
  councilId,
  handleShowAddOption,
}) => {
  const dispatch = useAppDispatch();
  // const [optionsAnim,setOptionsAnim] = useState<OptionsAnim>({totalWidth:0, options:[]});
  // const [width, setWidth] = useState<number>(0);

  const options = useAppSelector((state) =>
    state.options.options.filter((option) => option.councilId === councilId)
  );
  const order = useAppSelector(orderSelector);

  const maxVotes: number = options.reduce((prv, cur) => prv + cur.votes, 0);

  function handleOrder(order: Order) {
    try {
      dispatch(updateOrder(order));
      dispatch(reorderCouncilOptions({ councilId, sortBy: order }));
    } catch (error) {
      console.error(error);

      dispatch(updateOrder(Order.RANDOM));
    }
  }

  function updateWidth(
    optionId: string,
    width: number,
    optionsAnim: OptionsAnim
  ) {
    try {
      const index = optionsAnim.options.findIndex(
        (option) => option.optionId === optionId
      );
      if (index === -1) optionsAnim.options.push({ optionId, width });
      else optionsAnim.options[index].width = width;

      optionsAnim.totalWidth = optionsAnim.options.reduce(
        (prev, curr) => prev + curr.width,
        0
      );
      // setWidth(optionsAnim.totalWidth)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="optionsBar">
      <p>Total Votes:{maxVotes}</p>

      {options.length === 0 ? (
        <div className="btns">
          <button onClick={() => handleShowAddOption(true)}>ADD OPTION</button>
        </div>
      ) : null}
      <div
        className="optionsBar__wrapper"
        style={{
          gridTemplateColumns: `repeat(${options.length},1fr)`,
        }}>
        {options
          .sort((b, a) => a.created - b.created)
          .map((option) => (
            <OptionColumn
              key={`${option.optionId}-col`}
              option={option}
              width={barWidth}
              optionsAnim={optionsAnim}
              updateWidth={updateWidth}
              maxVotes={maxVotes}
            />
          ))}
      </div>
      <div className="bottomNav">
        
        <div
          className={
            order === Order.NEW
              ? "bottomNav__btn bottomNav__btn--selected"
              : "bottomNav__btn"
          }
          onClick={() => handleOrder(Order.NEW)}>
          New
        </div>
        <div
          className={
            order === Order.VOTED
              ? "bottomNav__btn bottomNav__btn--selected"
              : "bottomNav__btn"
          }
          onClick={() => handleOrder(Order.VOTED)}>
          Voted
        </div>
        <div
          className={
            order === Order.RANDOM
              ? "bottomNav__btn bottomNav__btn--selected"
              : "bottomNav__btn"
          }
          onClick={() => {
            handleOrder(Order.RANDOM);
          }}>
          Random
        </div>
        <div className="bottomNav__btn bottomNav__btn--add" onClick={() => handleShowAddOption(true)}>
          הוספת אפשרות
        </div>
      </div>
    </div>
  );
};

export default OptionsBars;
