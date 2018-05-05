import React from "react";
import { connect } from "react-redux";
import "./GameFooter.css";

const mapStateToProps = state => ({
  successCount: state.successCount,
  failureCount: state.failureCount
});

const GameFooter = ({ successCount, failureCount }) => (
  <div className="game-footer">
    <div className="game-footer-item">
      <div className="label success">SUCCESSES</div>
      <div className="field">{successCount}</div>
    </div>
    <div className="game-footer-item">
      <div className="label failure">FAILURES</div>
      <div className="field">{failureCount}</div>
    </div>
  </div>
);

export default connect(mapStateToProps)(GameFooter);
