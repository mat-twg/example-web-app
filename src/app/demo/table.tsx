import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import './table.css';

export type Entity = {
  _id: string;
  name: string;
  params: Record<string, number>[];
  createdAt: Date;
  updatedAt: Date;
};

enum BtnGroupItemAction {
  SUM = 'Sum',
  MIN = 'Min',
  MAX = 'Max',
  AVG = 'Avg',
}

interface BtnActiveInterface {
  active: BtnGroupItemAction;
  setActive: Dispatch<SetStateAction<BtnGroupItemAction>>;
}

interface BtnGroupItemInterface extends BtnActiveInterface {
  action: BtnGroupItemAction;
}

const BtnGroupItem = ({
  action,
  active,
  setActive,
}: BtnGroupItemInterface): JSX.Element => {
  return (
    <button
      className={'btn btn-dark' + (active === action ? ' active' : '')}
      onClick={() => setActive(action)}
    >
      {action}
    </button>
  );
};

const BtnGroup = ({ active, setActive }: BtnActiveInterface): JSX.Element => {
  return (
    <div className={'btn-group btn-group-custom'}>
      {Object.values(BtnGroupItemAction).map(
        (action: BtnGroupItemAction, idx) => (
          <BtnGroupItem
            key={'btn_group_item_' + idx}
            action={action}
            active={active}
            setActive={setActive}
          />
        ),
      )}
    </div>
  );
};

const FooterCell = ({
  defaultAction,
  columnIdx,
}: {
  defaultAction: BtnGroupItemAction;
  columnIdx: number;
}): JSX.Element => {
  const table = useContext(TableContext);
  const [active, setActive] = useState<BtnGroupItemAction>(defaultAction);

  return (
    <>
      {table.calc(active, columnIdx)}
      <BtnGroup active={active} setActive={setActive} />
    </>
  );
};

class Table {
  private head: any[] = [];
  private body: any[] = [];
  private foot: any[] = [];

  private entityToRow(entity: Entity): any[] {
    return [
      entity.name,
      ...entity.params.map((item) => Object.values(item)[0]),
    ];
  }

  public reset(): void {
    console.log('reset');
    this.head = [];
    this.body = [];
    this.foot = [];
  }

  public load(data: Entity[]): void {
    console.log('load data');
    const length = Object.entries(data).length;
    for (const [key, entity] of Object.entries(data)) {
      if (+key === 0) {
        this.head.push(
          ...['name', ...entity.params.map((item) => Object.keys(item)[0])],
        );
      }

      this.body.push(this.entityToRow(entity));

      if (+key === length - 1) {
        this.foot.push(...['ИТОГО:', ...entity.params.map(() => 0)]);
      }
    }
  }

  public update(entity: Entity): this {
    this.body.find((item: any[], idx) => {
      if (item[0] === entity.name) {
        this.body[idx] = this.entityToRow(entity);
        return true;
      }
      return false;
    });

    return this;
  }

  private getColumn(columnIdx: number): number[] {
    return this.body
      .map((row: number[]) => row.filter((col, idx) => idx === columnIdx))
      .flat();
  }

  public calc(action: BtnGroupItemAction, columnIdx: number): number {
    const column = this.getColumn(columnIdx);

    switch (action) {
      case BtnGroupItemAction.SUM:
        return +column.reduce((a, c) => a + c).toFixed(4);
      case BtnGroupItemAction.MIN:
        return Math.min(...column);
      case BtnGroupItemAction.MAX:
        return Math.max(...column);
      case BtnGroupItemAction.AVG:
        return +(column.reduce((a, c) => a + c) / column.length).toFixed(4);
      default:
        return 0;
    }
  }

  private renderHead(): JSX.Element {
    return (
      <thead>
        <tr>
          {this.head.map((header, idx) => (
            <th key={'header_' + idx}>{header}</th>
          ))}
        </tr>
      </thead>
    );
  }

  private renderBody(): JSX.Element {
    return (
      <tbody>
        {this.body.map((row: any[], rowId) => (
          <tr key={rowId}>
            {row.map((col, idx) =>
              idx === 0 ? (
                <th key={'body_' + rowId + '_' + idx}>{col}</th>
              ) : (
                <td key={'body_' + rowId + '_' + idx}>{col}</td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    );
  }

  private renderFoot(): JSX.Element {
    return (
      <tfoot>
        <tr>
          {this.foot.map((footer, idx) =>
            idx === 0 ? (
              <th key={'footer_' + idx}>{footer}</th>
            ) : (
              <td key={'footer_' + idx}>
                <FooterCell
                  defaultAction={BtnGroupItemAction.SUM}
                  columnIdx={idx}
                />
              </td>
            ),
          )}
        </tr>
      </tfoot>
    );
  }

  render(): JSX.Element {
    return (
      <table className={'table table-dark table-bordered table-custom'}>
        {this.renderHead()}
        {this.renderBody()}
        {this.renderFoot()}
      </table>
    );
  }
}

export const TableContext = createContext(new Table());
