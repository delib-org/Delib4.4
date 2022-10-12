import { FC, useState } from "react";
import { randomizeArray } from "../../../control/helpers";
import { useAppSelector } from "../../../model/hooks";
import { OptionProps, Order } from "../model/optionModel";
import OptionBar from "./OptionBar";
import OptionBtn from "./OptionBtn";
import OptionInfo from "./OptionInfo";
interface OptionsBarsProps {
  counsilId: string;
  handleShowAddOption: Function;
}


const OptionsBars: FC<OptionsBarsProps> = ({
  counsilId,
  handleShowAddOption,
}) => {
  const [orderBy, setOrder] = useState<Order>(Order.RANDOM);

  const options = sortOptions(useAppSelector((state) =>
    state.options.options.filter((option) => option.counsilId === counsilId)
  ), orderBy);
 
  const maxVotes: number = options.reduce((prv, cur) => prv + cur.votes, 0);

  function handleOrder(order: Order) {
    try {
      setOrder(order);
    } catch (error) {
      console.error(error);
      setOrder(Order.RANDOM);
    }
  }

  function sortOptions(
    options: Array<OptionProps>,
    order: Order
  ): OptionProps[] {
    switch (orderBy) {
      case Order.NEW:
        return options.sort(
          (b: OptionProps, a: OptionProps) =>
            (a.created || 0) - (b.created || 0)
        );

      case Order.VOTED:
        return options.sort(
          (b: OptionProps, a: OptionProps) => a.votes - b.votes
        );

      case Order.RANDOM:
        return randomizeArray(options)

      default:
        return options;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  return (
    <div className="optionsBar">
      <h3>OptionsBars</h3>
      <p>Total Votes:{maxVotes}</p>
      <div className="fav" onClick={() => handleShowAddOption(true)}>
        +
      </div>
      {options.length === 0 ? (
        <div className="btns">
          <button onClick={() => handleShowAddOption(true)}>ADD OPTION</button>
        </div>
      ) : null}
      <div
        className="optionsBar__grid"
        style={{ gridTemplateColumns: `repeat(${options.length},1fr)` }}>
        {options.map((option) => (
          <OptionBar
            key={`${option.optionId}-bar`}
            option={option}
            maxVotes={maxVotes}
          />
        ))}

        {options.map((option) => (
          <OptionInfo key={`${option.optionId}-info`} option={option} />
        ))}
        {options.map((option: OptionProps) => (
          <OptionBtn key={`${option.optionId}-btn`} option={option} />
        ))}
      </div>
      <div className="bottomNav">
        <div
          className={
            orderBy === Order.NEW
              ? "bottomNav__btn bottomNav__btn--selected"
              : "bottomNav__btn"
          }
          onClick={() => handleOrder(Order.NEW)}>
          New
        </div>
        <div
          className={
            orderBy === Order.VOTED
              ? "bottomNav__btn bottomNav__btn--selected"
              : "bottomNav__btn"
          }
          onClick={() => handleOrder(Order.VOTED)}>
          Voted
        </div>
        <div
          className={
            orderBy === Order.RANDOM
              ? "bottomNav__btn bottomNav__btn--selected"
              : "bottomNav__btn"
          }
          onClick={() => {
            handleOrder(Order.RANDOM);
      
          }}>
          Random
        </div>
      </div>
    </div>
  );
};

export default OptionsBars;
