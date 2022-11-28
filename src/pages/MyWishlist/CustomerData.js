import "tw-elements"

export default function CustomerData() {
  return (
    <>
      <div className="overflow-hidden shadow-lg p-2 rounded-xl">
        <table
          id="customer_act"
          className="table-auto min-w-full border border-spacing-y-px-2 scrollbar-custom bg-white overflow-hidden rounded-lg"
        >
          <thead>
            <tr className="bg-slate-300 text-slate-700">
              <th scope="col" className="text-left p-2">
                Mobile Number
              </th>
              <th scope="col" className="text-left p-2">
                Total Enquiry
              </th>
              <th scope="col" className="text-left p-2">
                Last Visit
              </th>
              <th scope="col" className="text-left p-2">
                IP
              </th>
              <th scope="col" className="text-left p-2">
                Location
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-500">
            <tr className="border-t-[2px] border-blue-900 bg-neutral-100">
              <td data-label="Mobile Number" className="p-2 text-sm">
                +6287845643110
              </td>
              <td data-label="Total Enquiry" className="p-2 text-sm">
                10
              </td>
              <td data-label="Last Visit" className="p-2 text-sm">
                21 Maret 2022
              </td>
              <td data-label="IP" className="p-2 text-sm">
                191.165.123.254
              </td>
              <td data-label="Location" className="p-2 text-sm">
                Sandrock Blaster
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
