"""
NETRA-RAIL Automated Python Test Suite
Unit tests for Python AI & Algorithmic Core Engines (JSSP, AKNN, Intermodal, CV, Collaboration)
"""

import sys
import os
import unittest

# Add parent directory to sys.path to import backend modules cleanly
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from algorithms.jssp_solver import JSSPSolverEngine
from algorithms.aknn_telemetry import AKNNTelemetryDetector
from algorithms.intermodal_engine import IntermodalFreightMatcher
from algorithms.garun_cv_detector import GarunCVDefectDetector
from algorithms.collaboration_engine import CollaborationSyncEngine
from algorithms.non_disruptive_collaboration import NonDisruptiveCollaborationEngine

class TestNETRACoreAlgorithms(unittest.TestCase):

    def test_jssp_solver(self):
        dataset_path = os.path.join(os.path.dirname(__file__), "..", "..", "Datasets", "pillar_b_traffic_throughput.csv")
        solver = JSSPSolverEngine(dataset_path)
        res = solver.solve("Rewari-Palanpur Corridor")
        self.assertEqual(res["status"], "OPTIMAL_SCHEDULE_CONVERGED")
        self.assertTrue(res["conflict_free"])
        self.assertGreater(len(res["schedule_sequence"]), 0)

    def test_aknn_telemetry(self):
        dataset_path = os.path.join(os.path.dirname(__file__), "..", "..", "Datasets", "pillar_c_imu_sensor.csv")
        detector = AKNNTelemetryDetector(dataset_path)
        res = detector.analyze(threshold_g=2.5)
        self.assertIn("algorithm", res)
        self.assertGreater(res["track_health_index"], 90)

    def test_intermodal_freight(self):
        dataset_path = os.path.join(os.path.dirname(__file__), "..", "..", "Datasets", "pillar_a_vessel_freight.csv")
        matcher = IntermodalFreightMatcher(dataset_path)
        res = matcher.match("Mundra")
        self.assertEqual(res["port"], "MUNDRA")
        self.assertIn("active_vessels_matched", res)

    def test_garun_cv_detector(self):
        cv = GarunCVDefectDetector()
        res = cv.inspect_frame("TEST-FRAME-001")
        self.assertTrue(res["defect_detected"])
        self.assertEqual(res["defect_type"], "TRANSVERSE_TRACK_FISSURE")
        self.assertGreater(res["confidence_score"], 90.0)

    def test_collaboration_sync(self):
        data_dir = os.path.join(os.path.dirname(__file__), "..", "..", "Datasets")
        sync = CollaborationSyncEngine(data_dir)
        state = sync.get_live_stream_state()
        self.assertIn("timestamp", state)
        self.assertGreater(state["active_operators_online"], 0)

    def test_non_disruptive_collaboration(self):
        data_dir = os.path.join(os.path.dirname(__file__), "..", "..", "Datasets")
        engine = NonDisruptiveCollaborationEngine(data_dir)
        stream = engine.get_non_disruptive_stream()
        self.assertEqual(stream["challenge_track"], "Non-Disruptive Live Update")
        self.assertEqual(stream["active_input_preservation"], "LOCKED_SAFE")

        bcast = engine.broadcast_condition_change("Test Controller", "Section 5", 30, "Track test")
        self.assertEqual(bcast["status"], "NON_DISRUPTIVE_BROADCAST_SUCCESS")
        self.assertFalse(bcast["input_interrupted"])

if __name__ == "__main__":
    unittest.main()
