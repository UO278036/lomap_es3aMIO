import React, { Component } from "react";
import "../../css/notificacion.css";
import GOMapSymbol from "../../img/symbols/GOMapSymbol.png";

interface NotificationProps {
    title: string;
    message: string;
    time: string;
    icon: string;
    onClose: () => void;
}

interface NotificationState {
    isOpen: boolean;
}

class Notification extends Component<NotificationProps, NotificationState> {
    private timer: ReturnType<typeof setTimeout> | null = null;

    constructor(props: NotificationProps) {
        super(props);

        this.state = {
            isOpen: true,
        };

        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.timer = setTimeout(this.handleClose, 5000);
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    handleClose() {
        this.props.onClose();
        this.setState({ isOpen: false });
    }

    render() {
        const { title, message, time, icon } = this.props;
        const iconUrl = icon === "GOMapSymbol" ? GOMapSymbol : icon;

        const { isOpen } = this.state;

        if (!isOpen) {
            return null;
        }

        return (
            <div className="notification">
                <div className="notification-icon">
                    <img src={GOMapSymbol} alt="icon" />
                </div>
                <div className="notification-content">
                    <div className="notification-title">{title}</div>
                    <div className="notification-message">{message}</div>
                    <div className="notification-time">{time}</div>
                    <button className="close-btn" onClick={this.handleClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>
        );
    }
}

export default Notification;
