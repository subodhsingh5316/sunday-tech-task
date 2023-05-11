import { Avatar, Divider, Skeleton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
  }),
);

const PopUp = ({ name, ...props }) => {
  const [show, setShow] = useState(false);
  const classes = useStyles();
  const getData = useSelector(state => state.UserReducer)
  const { loading, userData } = getData



  return (
    <>
      <Offcanvas show={show} onHide={props.handleClose} {...props} style={{ borderTopLeftRadius: '25px' }}>
        {
          loading ? (
            <>
              <div>
                <Skeleton variant="text" />
              </div>
            </>
          ) : (
            <>
              <div className='mt-12'>
                <div className='flex flex-row justify-between m-3'>
                  <div className='mx-2 text-slate-500 '><h4>User details</h4></div>
                  <div><i class="fa fa-ellipsis-vertical"></i></div>
                </div>
                <div className='flex flex-row my-5'>
                  <div className='mx-3'>
                    <Avatar sx={{ bgcolor: "wheat" }} sizes='large' alt='' src={props.popData?.image} className={classes.large} />
                  </div>
                  <div className='mx-2'>
                    <strong className='text-blue-950'>{props.popData?.firstName}{" "}{props.popData?.lastName} </strong><br />
                    <small className='text-slate-500 text-sm font-medium'>User Id: {props.popData?.id}</small><br />
                    <div className='bg-lime-700  rounded-full text-center text-white ' style={{ width: '100px' }}><small className='text-sm font-medium' >Active</small></div>
                  </div>
                </div>
                <Divider component='hr' />
                <div className='flex flex-row my-2'>
                  <div className='mx-3'>
                    <Avatar sx={{ bgcolor: "wheat" }} sizes='large' alt='' src={props.popData?.image} className={classes.small} />
                  </div>
                  <div className='mx-2'>
                    <small className='text-slate-500 text-sm font-medium'> Basic & Account details </small><br />
                  </div>
                </div>
                <div className='mx-5'>
                  <strong className='text-blue-950'> {props.popData?.firstName} </strong><br />
                </div>
                <div className='mx-5'>
                  <small className='text-slate-500 text-sm font-medium'> firstName</small><br />
                </div>
                <div className='mx-5'>
                  <strong className='text-blue-950'> {props.popData?.lastName} </strong><br />
                </div>
                <div className='mx-5 mb-3'>
                  <small className='text-slate-500 text-sm font-medium'> lastName </small><br />
                </div>
                <Divider component='hr' />
                <div className='flex flex-row my-3'>
                  <div className='mx-3'>
                    <Avatar sx={{ bgcolor: "wheat" }} sizes='large' alt='' src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAY1BMVEX////u7u4AAADv7+/t7e3+/v76+vr39/fz8/MgICDk5OTV1dVAQEDS0tI2Njbg4ODJyck7OzvDw8MbGxtCQkLKysqXl5dXV1dHR0fb29uPj4+enp4iIiIXFxcQEBBMTEwsLCxpS7FyAAALKklEQVR4nO2dDXejKhCGpYBSE5uP5qM23e79/7/yAkaFARmSa3Zr7szZs6e7HV95BE2YYbAoPJNFoRjjzDFRQY8SeDCGi5SoCA9EOCpSQRFVIEaABEiABEiABEiABEiABPiDAFkMEFigo4DD7YCFBUREcgClZ/ooxQXjjmlAz6OQum2CewY9QpHyDhGOilTcF9GAElikBwU+RAU6RKFIePGFSPWgaRm/XQQdovowJYBV0EUDAsNFSuhSQZFgiN4jEgFUnnGlKtjJFXSpSugSiAQevgiPiJS4iLpVRFvhjzU9Kkrb+e5lEp4HM5cJDG3fQ4tI6KJ8FzsufA8ZEZEpEYWK2LvH/6ewgHAcAJdwHAgoAu9t+FiNDHz5ABED6D/JdAeV0n+0akDPg3FlnraeQQ8moYiCLpWET/CYiLxRpPQ87LPZ59VHoUOUIUPUuGBD1H66JkdXVAR63D5ECZAA52rb4gCfvgdnBtSf8tqCj7SCw2/oSwQ0369Fs93v98cmsFr/jjtSSwTU7d+czuvdbreGdjifNmrxgEzVp++XCfs+1cK9V5f4FBWiPkzxvbx8bLyLucQeVLx5nwZ8b7wHzRIBhVq9JgBX3iS48CeMLDarhB6R2YTnoV3CiQAqIrNFuGh/TQO+rsxjdJyLVwu0cpPowde2LB3foDPsYPIuZhiysF3gXu5AhEORYFwEIpGo2qRInQKsQyZnnCwjLkqABEiABEiABEiABEiATwHo5wcKk5xlWIbXxHWmk7NRkTDDi4vwKREM0D8VNCVAmic6m0j1YEwkOptI9WBhZhNxkTTgVx3Mx72BIU322RXGU9hwuhQTiawfACJBCluaLo6L3DJES2gVzJFWqIf60yLJCe9GuiIgZKHnnRkhi2AE4CJByCKSu4Qik3EP3qaCTivuqtyewhZYCpvNksJmMZH+tysE0BHyM7zmvkAyvALP8Ao0wytMcvY/iKQB1aMzvGymxNCkCE+HDb2H1xLjoj8TEHo8HeDT9yABEiAB/l1A6PF0gE/fgwT4fwNkLLJeVDwGEHoEgHCx7gwPmU4Ervjtf3kLYGAKpl7xDG+wKN2GU+LJ2UmRMCYTrH2nsCEBEiABEiABEiABEiABLhiwCOuLM4qUw+/JgUgMEBVxaiGNA8sF9OYgft64yC1S9svYZihS1oCyKDduCYSpjLC2bQQX3PRgRgr7K5nCljMUKcuYSFaRMr+cP5wiiN1g588Nn2e6VGQVKXPogovkFCmXl+ml2J9mIXYW4BcA5MAi9cXQJShjlrOIVM15utnvsizlNfGnVDrDm8wPzlaknK4vZpEMr9q/TTf7RY0iQqQSoGbV/XRpT06RcqQaX0CRMF4ERSI5+u06AWgeZH3tEp7hdQC9cWOfxbA0OCxSLnKKlH2RjCJltd8lAJm9Stfj/3IK+86wIU8CKmcYLDQuunBA6PF0gE/fgwRIgD8cEHo8HeDT9yABEuCdgP6sM1Ya/KeKlDMA+7kxAujNxe9bbg2c5hCp5DE1Xaqr7DXb3nmCzsgsUvZcbi5SlhERXjQpQBOUWXpcFAFcfuCXAAmQAAmQAAmQAAmQAEFr/ByClA8qUpaYiEIA1Siy1CLl3B6co0jZzkm7PxMp7G7eyrq/J0TY+CdepOyeRgMmtoO7f7oEpqFlhc1VYy5ziFRl7oQX2ZVrU7onC0IWeUXKMCYDQhZ5Rco3xWSEI8L+cpFytL4YL1LOAOyPv7tImT+sSDkQCTO8fJsGlHJI3f6oDG83nv1VFoJ3jy73SY70IHd68KfFRcu6rtuVa+2qaetaXHsxC/AHB37V5ePr9fX91TH9j/f3fz4uSj4D4GW6MZf8IfpzAeuP6cb8FsXwkbNYwDbR7F377IAr52m7VMAVAtgbARIgARJgJiDz6ovnBLynSJlDw1cjK+gRLGl2RDDAUSS9XpQ7swlkI3F/NhHYzEXKfJtYqPy25WxwXGiGV6UBFe+rC5YaFyVAAiRAAiRAAiRAAiTAmQC1KdD4oEjZlN+a5gvGh7aNaOZvu4N0D3hMAR7V4DgjoDeZg6llffFzipSFKcTsXiGnrYCKXPX5aQTQnKA7DQrIr0XKeIbXb28wurKKlPXkpT1ue+szD63+wcydpBrqmNPTpSMftqv+M9OlIrtIuf78eBtsrJfevZ1Pyl6lfiEv0oOzr/iFRcr+/aZ7Dy1xtam94jR5hu9PYYqU+8OxGf14ZZH84BCT4UiRsp8A9VufXaRcJU5xbtQNke0BkGWksLtLnCxSfk8XKcNNGSI9aIuUVaIt672S2T04hu6xHpRDDz6+SLkoeKItuy2XQ5Y7N+iERdX+cJFyGnDPFx8XJUACJEACvBVQ2NabZWbgG6rZ+cUuX7JfL5cOyHjkqydXrFvDJZYMaI9UepqjwIZNdbtpN/a/7C5MywbcfP4TP+zrc2MXuS4bkIvpOcLLp+lYu9PUggHb1DumW/sepMUBegtxV1/TB76ubK6yWxCbAVg8ALCfG99dpJz3wiazerpOtGXdSGcpdnpG76zclskZfe0s/Ja3vFjKs4xYh4nJ6LtxkwR0XluGhA15H7zBQxZzhA2xA+UQF0UA1bDv3c+KixIgARIgARIgARIgAf4PANVyAL1kKA5oM7yco1+2+8QtTwMexzyCwkpcNWDf0GQ7N4kMb96VKXX3pAAPjVMPmU5hb7nIztEPu/P+hyLljMxpl8JODtErYM6K3+OYT35UkXLlGDLhdV2TE95j6Wg2KcDGPTtSpOzYJrVLc1u6rkPIwhR754QCePcmZZZoy26vnPB4dsgiJ8N7NTTDGxYpm2p4BLDtbpVZYzKtA4glQIdtqO8qUmb2qZc8sLWO1yJlkQLcqrFIOQn4tirGgmesCttsIHG1dnrP+JdfiQwvbxPFjB+tWfxiLo7pwSoRfzs33Km0r39Pe/6uxye5FKmt4L/kmKMXSDu9N8XDwO/31HHfJ/uKedFXvkyHiH+dzN6Gw9qCRInr90V/qBb9w1+ffbpjToUcAVWdbidTE4D6G9jpfDjsDmvXdm+H9e582nR4V0CpLtrzAF6cYH4wns5e97pZp/P6sAts/XG+KAM49KA++++166HtYE17yhGQC9Vqzd7FtYNt52QP6mPr5tgAO5p3WjRC2UfRAOi9/GLvmPZ0e9DcYa3zcozxJRlNe73/ekDd8qPrN+pvusvQ96DJIdhzBm1tmlr/Tk0CmjV0wad/pcy6Oz0wBO++d6jrd7bR+Bi+5dpVCafd3Q9gaw7Owo0CTF6r0gcPPs4JzAUt+qeoWSfGzYnCVVnSbkIgJoeoCc0Hm0xUdlsUbv9mfACUpSx7x+6KdbkZe6s63wHt8zTYQFVV19Uxg6c0J6/V0DYuiqEl0p5wvAf7UwVtLU36S1SJIapHVwm+yRl3oydsL7K+vM79IjuEsYW9S81eFuM9aC6zVN5pVK0/TA1eOWZppLCDq5fSvXS9NtceHAGZbQuP7sKq/08/g9yVTgBwvgJJ32Z9i2u2yEMBQdsIkAB/OOCtbXsQYLdBWBoQ3/KIxbahxkSCtmWI5ADC7bPMamS/TjncYQt6yDlESlwk8MgQgRdp9iLlq0U3jvM8om9SRkQq6BHh8U3+zb0NoQtHRSooQoAESIAESIAESIAESICLBbTRVbA99ESRsuvBAxG4x3TwJmVZcn/pOxQpukrntEgFPSKAElhhFt77PQgcbNtAD0IRniESvGgYijDgIkooUkERFfJEezAxXep6ELxqONqDmAjwCIeBCUAmpkuy28samXPB/ixkxhAFAwNufRUTiYwusNs6GF2akDN8iKZFtP0LpoGg9Gw+/MgAAAAASUVORK5CYII='} className={classes.small} />
                  </div>
                  <div className='mx-2'>
                    <small className='text-slate-500 text-sm font-medium'>User Data</small><br />
                  </div>
                </div>
              </div>
              <div className='mx-5'>
                <strong className='text-blue-950'> May 18,2020- 11.45pm </strong><br />
              </div>
              <div className='mx-5'>
                <small className='text-slate-500 text-sm font-medium'> Last login </small><br />
              </div>
            </>
          )
        }
      </Offcanvas>
    </>
  );
}

export default PopUp