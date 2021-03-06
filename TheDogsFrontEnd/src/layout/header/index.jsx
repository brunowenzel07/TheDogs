import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import windowSize from 'react-window-size';
import Notification from './component/notification'
import Path from '../../configure';
import { openChatBox } from '../../redux/actions/chatActions';
import UserProfile from './component/userprofile';
import MainSearch from './component/search';
import Breadcrumb from '../breadcrumb/breadcrumb';
import navigation from '../../menus';
import NavContent from '../sidebar/navcontent';
// import NavLogo from './navlogo/navLogo';
class Header extends Component {
  state = {
    navOpen: true
  }
  toggle = () => {
    this.setState({ navOpen: !this.state.navOpen })
  }
  componentWillMount() {
    if (this.props.windowWidth < 992) {
      this.setState({ navOpen: true })
    }
  }
  render() {
    return (

      <header className="pcoded-header navbar-expand-lg navbar-light">
        {/* //link mobile */}
        <div className="m-header">
          <Link
            to="#"
            style={{ zIndex: 9999 }}
            onClick={() => this.props.collapseMenuRes()}
            className={classnames("mobile-menu", {
              on: this.props.resMenu
            })}
          >
            <span></span>
          </Link>
          <Link to={Path.defaultPath} className="b-brand">
            <div className="b-bg">
              T
            </div>
            <span className="b-title">
              Teste
            </span>
          </Link>
        </div>
        <Link to="#" className="mobile-menu" id="mobile-header">
          <i className="feather icon-more-horizontal"></i>
        </Link>
        <div className="collapse navbar-collapse">
          <Link onClick={this.toggle} className="mob-toggler" to="#"></Link>
          {this.props.windowWidth < 992 ? (
            <React.Fragment>
              {this.props.layout !== "horizontal" ?
                (<ul className="navbar-nav mr-auto" style={{ display: `${!this.state.navOpen ? `none` : ``}` }}>
                  <li>
                    <div className="page-header">
                      <div className="page-block">
                        <Row className="align-items-center">
                          <Breadcrumb />
                        </Row>
                      </div>
                    </div>
                  </li>
                </ul>
                ) :
                null
              }
              <ul className="navbar-nav ml-auto" style={{ display: `${this.state.navOpen ? `none` : `block`}` }}>
                <li className="nav-item">
                  <MainSearch />
                </li>
                <li><Notification /></li>
                <li>
                  <Link
                    to="#"
                    className="displayChatbox"
                    onClick={() => this.props.openChatBox()}
                  >
                    <i className="icon feather icon-mail"></i>
                  </Link>
                </li>
                <li>
                  <UserProfile />
                </li>
              </ul>
            </React.Fragment>
          ) :
            (
              <React.Fragment>
                {
                  this.props.layout !== "horizontal" ?
                    (<ul className="navbar-nav mr-auto">
                      <li>
                        <div className="page-header">
                          <div className="page-block">
                            <Row className="align-items-center">
                              <Breadcrumb />
                            </Row>
                          </div>
                        </div>
                      </li>
                    </ul>) : null
                }

                {/* <div className="navbar-content sidenav-horizontal sidenav" id="layout-sidenav">
                  <a href="#!" className='sidenav-horizontal-prev'></a>
                  <div id="sidenav-wrapper" className="sidenav-horizontal-wrapper">
                    <ul id="sidenav-horizontal" className="nav pcoded-inner-navbar sidenav-inner">
                      <NavContent
                        navigation={navigation.items}
                        parentLi="nav-item"
                        parentLiA="nav-link"
                        parentLiCa="nav-item pcoded-menu-caption"
                        toggleCls="pcoded-hasmenu"
                        activeToggle="pcoded-trigger"
                        collapesTitle="nav-link"
                        subUi="pcoded-submenu"
                        {...this.props}
                      />
                    </ul>
                  </div>
                  {/* <a href="#!" className={'sidenav-horizontal-next'} onClick={this.scrollNextHandler}><span /></a> */}
                {/* </div> */}
           
                {/* < ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <MainSearch />
                  </li>
                  <li><Notification /></li>
                  <li>
                    <Link
                      to="#"
                      className="displayChatbox"
                      onClick={() => this.props.openChatBox()}
                    >
                      <i className="icon feather icon-mail"></i>
                    </Link>
                  </li>
                  <li>
                    <UserProfile />
                  </li>
                </ul> */}

              </React.Fragment>
            )
          }
        </div>
      </header>
    );
  }
}
const mapStateToProps = state => ({
  navUpdate: state.Navigation.navUpdate
})
const mapDispatchToDispatch = {
  openChatBox
}

export default connect(mapStateToProps, mapDispatchToDispatch)(windowSize(Header));