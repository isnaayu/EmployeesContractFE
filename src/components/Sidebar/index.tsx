import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../../images/logo/logoec.png';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-4 lg:py-5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-4 py-4 px-4 lg:mt-4 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
                            {/* Menu Employee */}
                            <li>
                <NavLink
                  to="/employees"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
                      fill=""
                    />
                    <path
                      d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
                      fill=""
                    />
                  </svg>
                  Employees
                </NavLink>
              </li>
              {/* End Menu Employee */}

              {/* Branch Menu */}
              <li>
                <NavLink
                  to="/branches"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg className="fill-current"
                    width="18"
                    height="18" fill="none" viewBox="-0.23 0 16 16" id="branch-16px" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="Path_194" data-name="Path 194" d="M-12.5-96h-7A1.5,1.5,0,0,0-21-94.5v3a.5.5,0,0,0,.5.5.5.5,0,0,0,.5-.5v-3a.5.5,0,0,1,.5-.5h7a.5.5,0,0,1,.5.5V-81h-2v-3.5a.5.5,0,0,0-.5-.5h-3a.5.5,0,0,0-.5.5V-81h-1.5a.5.5,0,0,0-.5.5.5.5,0,0,0,.5.5H-11V-94.5A1.5,1.5,0,0,0-12.5-96ZM-17-81v-3h2v3Zm0-10h-2v-2h2Zm4,0h-2v-2h2Zm-2,2h2v2h-2Zm-3.755,2H-17v-2h-2v1.526a4.023,4.023,0,0,0-.646-.88,4.042,4.042,0,0,0-5.708,0,4.042,4.042,0,0,0,0,5.708l2.5,2.5A.5.5,0,0,0-22.5-80a.5.5,0,0,0,.354-.146l2.5-2.5A4.041,4.041,0,0,0-18.755-87ZM-22.5-81.207l-2.146-2.147a3.037,3.037,0,0,1,0-4.292,3.024,3.024,0,0,1,2.146-.888,3.024,3.024,0,0,1,2.146.888,3.037,3.037,0,0,1,0,4.292ZM-21-85.5A1.5,1.5,0,0,1-22.5-84,1.5,1.5,0,0,1-24-85.5,1.5,1.5,0,0,1-22.5-87,1.5,1.5,0,0,1-21-85.5Z" transform="translate(26.534 96)"></path> </g></svg>
                  Branch
                </NavLink>
              </li>
              {/* End Branch Menu */}

              {/* Positions Menu */}
              <li>
                <NavLink
                  to="/positions"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg className="fill-current"
                    width="18"
                    height="18" fill="none" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 977.733 977.733" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M466.647,173.195c-37.811,0-62.039,32.671-62.039,86.268c0,53.963,24.229,88.47,62.039,88.47 c37.812,0,62.039-34.507,62.039-88.47C528.688,205.866,504.459,173.195,466.647,173.195z"></path> <path d="M741.604,204.765c0-22.026-15.784-31.203-46.987-31.203h-31.203v66.444h30.469 C727.288,240.006,741.604,227.158,741.604,204.765z"></path> <path d="M948.044,515.337V96.722c0-44.183-35.815-80-80-80H109.689c-44.183,0-80,35.817-80,80v460.589 c2.229-11.306,7.2-21.999,14.561-30.994c10.256-12.535,24.647-21.202,40.523-24.403c43.117-8.698,99.986-20.01,126.049-24.486 c2.815-0.483,5.684-0.729,8.527-0.729c27.614,0,50.079,22.486,50.079,50.125v47.958h98.898v-3.915 c0-16.193,5.648-32.016,15.902-44.547c10.256-12.534,24.647-21.202,40.522-24.402c43.115-8.699,99.981-20.01,126.049-24.488 c2.815-0.482,5.686-0.729,8.527-0.729c27.614,0,50.079,22.486,50.079,50.125v47.958h98.897v-3.915 c0-16.193,5.647-32.016,15.901-44.547c10.256-12.534,24.647-21.201,40.522-24.402c43.117-8.699,99.985-20.011,126.05-24.487 c2.813-0.483,5.684-0.729,8.526-0.729C922.972,476.696,942.841,493.217,948.044,515.337z M313.57,305.349 c0,43.685-21.292,79.66-71.583,79.66c-33.406,0-56.533-13.95-71.584-40.747l29.367-21.659 c9.545,17.62,22.76,25.329,37.443,25.329c22.394,0,33.773-12.113,33.773-46.254V140.523h42.583L313.57,305.349L313.57,305.349z M466.647,385.009c-62.406,0-105.724-47.723-105.724-125.547c0-77.458,43.316-123.345,105.724-123.345 c62.773,0,106.092,45.887,106.092,123.345C572.739,337.287,529.421,385.009,466.647,385.009z M703.794,380.604H620.83v-240.08 h76.725c49.559,0,85.899,15.051,85.899,59.102c0,22.76-13.216,44.786-41.115,52.128v1.468 c34.509,5.874,53.597,24.596,53.597,56.9C795.935,358.211,756.655,380.604,703.794,380.604z"></path> <path d="M699.389,270.475h-35.977v77.09h35.977c35.24,0,55.063-13.215,55.063-40.381 C754.453,282.222,735.364,270.475,699.389,270.475z"></path> <path d="M937.392,746.398H720.299c-22.279,0-40.341,18.062-40.341,40.342v160.662c0,7.518,6.094,13.609,13.609,13.609h270.557 c7.518,0,13.609-6.094,13.609-13.609V786.74C977.733,764.459,959.671,746.398,937.392,746.398z"></path> <path d="M895.857,506.993c-26.644,4.575-87.396,16.699-125.194,24.325c-18.825,3.8-32.357,20.341-32.357,39.545v3.915v48.278 c0,50.004,40.536,90.539,90.539,90.539c50.005,0,90.54-40.535,90.54-90.539v-48.278V526.82c0-11.295-9.21-20.125-20.079-20.125 C898.172,506.695,897.02,506.792,895.857,506.993z"></path> <path d="M597.413,746.398H380.32c-22.28,0-40.342,18.062-40.342,40.342v160.662c0,7.518,6.093,13.609,13.609,13.609h270.558 c7.517,0,13.608-6.094,13.608-13.609V786.74C637.754,764.459,619.693,746.398,597.413,746.398z"></path> <path d="M555.878,506.993c-26.642,4.575-87.394,16.699-125.192,24.325c-18.825,3.8-32.358,20.341-32.358,39.545v3.915v48.278 c0,50.004,40.536,90.539,90.54,90.539c50.004,0,90.54-40.535,90.54-90.539v-48.278V526.82c0-11.295-9.211-20.125-20.08-20.125 C558.193,506.695,557.04,506.792,555.878,506.993z"></path> <path d="M257.434,746.398H40.342C18.062,746.398,0,764.461,0,786.74v160.662c0,7.518,6.093,13.609,13.609,13.609h270.557 c7.516,0,13.609-6.094,13.609-13.609V786.74C297.776,764.459,279.714,746.398,257.434,746.398z"></path> <path d="M215.9,506.993c-26.642,4.575-87.394,16.699-125.194,24.325c-18.824,3.8-32.358,20.341-32.358,39.545v3.915v48.278 c0,50.004,40.536,90.539,90.54,90.539c50.004,0,90.54-40.535,90.54-90.539v-48.278V526.82c0-11.295-9.21-20.125-20.08-20.125 C218.214,506.695,217.061,506.792,215.9,506.993z"></path> </g> </g> </g> </g></svg>
                  Positions
                </NavLink>
              </li>
              {/* End Positions Menu */}


              {/* File Lists Menu */}
              <li>
                <NavLink
                  to="/file-lists"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg height="20" width="20" className='fill-current' fill='none' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 59.253 59.253" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path fill="#FFFFFF" d="M43.519,4.149h-7.881V2.81c0-1.552-1.259-2.81-2.811-2.81h-6.4c-1.553,0-2.81,1.258-2.81,2.81 v1.339h-7.881c-3.575,0-6.484,2.909-6.484,6.483v42.14c0,3.573,2.909,6.481,6.484,6.481h27.782c3.574,0,6.483-2.908,6.483-6.481 v-42.14C50.003,7.058,47.096,4.149,43.519,4.149z M29.628,1.268c0.774,0,1.402,0.628,1.402,1.402c0,0.773-0.628,1.401-1.402,1.401 s-1.401-0.628-1.401-1.401C28.226,1.896,28.853,1.268,29.628,1.268z M22.042,8.131h15.173v5.921H22.042V8.131z M43.521,55.548 H15.737c-1.533,0-2.78-1.246-2.78-2.776v-42.14c0-1.532,1.247-2.779,2.78-2.779h2.65v6.62c0,1.782,1.449,3.231,3.232,3.231h16.018 c1.782,0,3.231-1.449,3.231-3.231v-6.62h2.651c1.531,0,2.777,1.247,2.777,2.779v42.14h0.002 C46.299,54.302,45.053,55.548,43.521,55.548z"></path> <path fill="#FFFFFF" d="M23.233,23.929l-0.649,0.774c-0.219-0.558-0.759-0.955-1.394-0.955h-4.312 c-0.827,0-1.5,0.673-1.5,1.5v4.75c0,0.827,0.673,1.5,1.5,1.5h4.312c0.827,0,1.5-0.673,1.5-1.5v-2.54l1.962-2.34 c0.329-0.392,0.277-0.975-0.114-1.305C24.145,23.488,23.562,23.539,23.233,23.929z M21.691,29.999L21.691,29.999 c-0.001,0.275-0.226,0.5-0.501,0.5h-4.312c-0.275,0-0.5-0.226-0.5-0.5v-4.75c0-0.275,0.225-0.5,0.5-0.5h4.312 c0.275,0,0.5,0.225,0.5,0.5v0.521l-1.249,1.489c-0.328,0.393-0.898,0.427-1.272,0.079l-0.77-0.713 c-0.373-0.349-0.963-0.327-1.308,0.048c-0.349,0.374-0.326,0.96,0.049,1.309l2.16,2.007c0.171,0.16,0.398,0.247,0.63,0.247 c0.02,0,0.037,0,0.059-0.001c0.253-0.017,0.488-0.136,0.651-0.329l1.051-1.253C21.691,28.653,21.691,29.999,21.691,29.999z"></path> <path fill="#FFFFFF" d="M23.233,34.002l-0.717,0.854c-0.249-0.481-0.747-0.815-1.326-0.815h-4.312 c-0.827,0-1.5,0.674-1.5,1.5v4.75c0,0.827,0.673,1.5,1.5,1.5h4.312c0.827,0,1.5-0.673,1.5-1.5v-2.759l1.962-2.34 c0.329-0.392,0.277-0.976-0.114-1.306C24.145,33.559,23.562,33.611,23.233,34.002z M21.691,40.291L21.691,40.291 c-0.001,0.275-0.226,0.5-0.501,0.5h-4.312c-0.275,0-0.5-0.225-0.5-0.5v-4.75c0-0.274,0.225-0.5,0.5-0.5h4.312 c0.275,0,0.5,0.226,0.5,0.5v0.301l-1.249,1.49c-0.328,0.391-0.898,0.428-1.272,0.078l-0.77-0.713 c-0.373-0.35-0.963-0.327-1.308,0.048c-0.349,0.375-0.326,0.962,0.049,1.31l2.16,2.007c0.171,0.161,0.398,0.248,0.63,0.248 c0.02,0,0.037,0,0.059-0.003c0.253-0.016,0.488-0.135,0.651-0.328l1.051-1.253C21.691,38.726,21.691,40.291,21.691,40.291z"></path> <path fill="#FFFFFF" d="M23.233,44.127l-0.744,0.887c-0.258-0.453-0.74-0.764-1.299-0.764h-4.312 c-0.827,0-1.5,0.672-1.5,1.5v4.75c0,0.826,0.673,1.5,1.5,1.5h4.312c0.827,0,1.5-0.674,1.5-1.5v-2.845l1.962-2.34 c0.329-0.392,0.277-0.976-0.114-1.306C24.145,43.683,23.562,43.735,23.233,44.127z M21.691,50.5L21.691,50.5 C21.69,50.774,21.465,51,21.19,51h-4.312c-0.275,0-0.5-0.226-0.5-0.5v-4.75c0-0.275,0.225-0.5,0.5-0.5h4.312 c0.275,0,0.5,0.225,0.5,0.5v0.217l-1.249,1.488c-0.328,0.393-0.898,0.428-1.272,0.08l-0.77-0.714 c-0.373-0.349-0.963-0.327-1.308,0.048c-0.349,0.375-0.326,0.961,0.049,1.309l2.16,2.008c0.171,0.16,0.398,0.248,0.63,0.248 c0.02,0,0.037,0,0.059-0.002c0.253-0.016,0.488-0.135,0.651-0.329l1.051-1.253C21.691,48.85,21.691,50.5,21.691,50.5z"></path> <path fill="#FFFFFF" d="M43.236,26.993H28.265c-0.513,0-0.927,0.413-0.927,0.925c0,0.514,0.414,0.927,0.927,0.927h14.972 c0.513,0,0.927-0.413,0.927-0.927C44.163,27.406,43.749,26.993,43.236,26.993z"></path> <path fill="#FFFFFF" d="M43.236,36.063H28.265c-0.513,0-0.927,0.414-0.927,0.927c0,0.512,0.414,0.926,0.927,0.926h14.972 c0.513,0,0.927-0.414,0.927-0.926C44.163,36.477,43.749,36.063,43.236,36.063z"></path> <path fill="#FFFFFF" d="M43.236,45.134H28.265c-0.513,0-0.927,0.414-0.927,0.928c0,0.511,0.414,0.925,0.927,0.925h14.972 c0.513,0,0.927-0.414,0.927-0.925C44.163,45.548,43.749,45.134,43.236,45.134z"></path> </g> </g> </g></svg>
                  File List
                </NavLink>
              </li>
              {/* End Positions Menu */}



              
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
