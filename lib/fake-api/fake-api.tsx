export type FakeItem = {
  id: string;
  name: string;
};

export const fakeApi = {
  async getItems(
    options: {
      count: number;
      cursor: number;
      fakeDelay: number;
    } = {
      count: 10,
      cursor: 0,
      fakeDelay: 0,
    }
  ): Promise<{
    items: FakeItem[];
    nextCursor: number;
  }> {
    const items = new Array(options.count).fill(0).map((_, index) => ({
      id: `id-${options.cursor + index}`,
      name: `Item ${options.cursor + index}`,
    }));

    await new Promise((resolve) =>
      setTimeout(resolve, options.fakeDelay || 1000)
    );

    return {
      items,
      nextCursor: options.cursor + options.count,
    };
  },
};
